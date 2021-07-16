<template>
  <div class="article-page" v-if="article">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <McvArticleMeta
          :article="article"
          :is-author="isAuthor"
          @deleteArticle="deleteArticle"
        />
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
      <hr />
      <div class="article-actions">
        <McvArticleMeta
          :article="article"
          :is-author="isAuthor"
          @deleteArticle="deleteArticle"
        />
      </div>
      <McvComments />
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
import McvArticleMeta from '@/components/ArticleMeta'
import McvComments from '@/components/Comments'

export default {
  name: 'McvArticle',
  components: {
    McvComments,
    McvArticleMeta,
    McvTagList,
    McvErrorMessage,
    McvLoading,
  },
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
