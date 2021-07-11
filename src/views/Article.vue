<template>
  <div class="article-page" v-if="article">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{name: 'home', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" alt="author avatar" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'home',
                params: {slug: article.author.username},
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{name: 'editArticle', params: {slug: article.slug}}"
            >
              <i class="ion-edit" />
              Edit article
            </router-link>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="deleteArticle"
            >
              <i class="ion-trash-a" />
              Delete article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="page container">
      <McvLoading v-if="isLoading" />
      <McvErrorMessage v-if="error" />

      <div class="row article-content">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <McvTagList :tags="article.tagList" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'

import {actionTypes} from '@/store/modules/article'
import {getterTypes} from '@/store/modules/auth'

import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvTagList from '@/components/TagList'

export default {
  name: 'McvArticle',
  components: {McvTagList, McvErrorMessage, McvLoading},
  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      error: (state) => state.article.error,
      article: (state) => state.article.data,
    }),
    ...mapGetters({
      currentUser: getterTypes.currentUser,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false
      }
      return this.currentUser.username === this.article.author.username
    },
  },
  created() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    })
  },
  methods: {
    deleteArticle() {
      this.$store
        .dispatch(actionTypes.deleteArticle, {
          slug: this.$route.params.slug,
        })
        .then(() => {
          this.$router.push({name: 'home'})
        })
    },
  },
}
</script>
