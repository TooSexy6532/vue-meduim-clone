<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <McvFeedView :url="apiUrl" />
        </div>
        <div class="col-md-3">tags</div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeedView from '@/components/FeedView'
export default {
  components: {McvFeedView},
  data() {
    return {
      apiUrl: '/articles',
    }
  },
}
</script>
