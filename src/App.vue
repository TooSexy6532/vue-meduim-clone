<template>
  <div>
    <McvTopBar />
    <router-view></router-view>
  </div>
</template>

<style lang="scss"></style>
<script>
import McvTopBar from '@/components/TopBar'
import {actionTypes} from '@/store/modules/auth'

export default {
  components: {McvTopBar},
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  },
}
</script>
