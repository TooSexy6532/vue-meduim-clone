<template>
  <div>
    <McvLoading v-if="isLoading" />
    <McvErrorMessage v-if="error" />

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" alt="profileLogo" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <McvAddToFavorites
              :isFavorited="article.favorited"
              :favoritesCount="article.favoritesCount"
              :slug="article.slug"
            />
          </div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <McvTagList :tags="article.tagList" />
        </router-link>
      </div>
      <McvPagination
        :total="feed.articlesCount"
        :limit="limit"
        :url="baseUrl"
        :currentPage="currentPage"
      />
    </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/feed'
import {mapState} from 'vuex'
import McvPagination from '@/components/Pagination'
import {LIMIT} from '../../utils/vars'
import {stringify, parseUrl} from 'query-string'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvTagList from '@/components/TagList'
import McvAddToFavorites from '@/components/AddToFavorites'

export default {
  name: 'McvMainFeed',
  components: {
    McvAddToFavorites,
    McvTagList,
    McvErrorMessage,
    McvLoading,
    McvPagination,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),

    limit() {
      return LIMIT
    },

    offset() {
      return this.currentPage * this.limit - this.limit
    },

    currentPage() {
      return Number(this.$route.query.page || '1')
    },

    baseUrl() {
      return this.$route.path
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed()
    },
    apiUrl() {
      this.fetchFeed()
    },
  },
  created() {
    this.fetchFeed()
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit: this.limit,
        offset: this.offset,
        ...parsedUrl.query,
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
    },
  },
}
</script>

<style scoped></style>
