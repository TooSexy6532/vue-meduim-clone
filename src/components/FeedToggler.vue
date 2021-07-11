<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLogedIn">
        <router-link
          :to="{name: 'yourFeed'}"
          class="nav-link"
          :class="{active: routeName === 'yourFeed'}"
        >
          Your Feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{name: 'home'}"
          class="nav-link"
          :class="{active: routeName === 'home'}"
        >
          Global Feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          v-if="tagName"
          :to="{name: 'tag'}"
          class="nav-link"
          :class="{active: routeName === 'tag'}"
        >
          <i class="ion-pound" />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
    <p>Global Feed</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getterTypes} from '@/store/modules/auth'

export default {
  name: 'McvFeedToggler',
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      isLogedIn: getterTypes.isLogedIn,
    }),
    routeName() {
      return this.$route.name
    },
  },
}
</script>

<style scoped></style>
