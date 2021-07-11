<template>
  <div class="home-page">
    <McvBanner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <McvFeedToggler :tag-name="tagName" />
          <McvMainFeed :apiUrl="apiUrl" />
        </div>
        <McvPopularTags />
      </div>
    </div>
  </div>
</template>

<script>
import McvMainFeed from '@/components/MainFeed'
import McvPopularTags from '@/components/PopularTags'
import McvBanner from '@/components/Banner'
import McvFeedToggler from '@/components/FeedToggler'
export default {
  name: 'McvYourFeed',
  components: {McvFeedToggler, McvBanner, McvPopularTags, McvMainFeed},
  computed: {
    tagName() {
      return this.$route.params.slug
    },
    apiUrl() {
      return `/articles?tag=${this.tagName}`
    },
  },
}
</script>
