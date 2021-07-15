<template>
  <button
    @click="follow"
    :class="{
      btn: true,
      'btn-sm': true,
      'action-btn': true,
      'btn-secondary': isFollowed,
      'btn-outline-secondary': !isFollowed,
    }"
  >
    <i class="ion-plus-round"> </i>
    <slot></slot>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'

export default {
  name: 'McvFollowUser',
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isFollowed() {
      return this.author.following
    },
  },
  methods: {
    follow() {
      this.$store.dispatch(actionTypes.followUser, {
        authorName: this.author.username,
        isFollowed: this.isFollowed,
      })
    },
  },
}
</script>
