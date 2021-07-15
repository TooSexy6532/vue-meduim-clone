<template>
  <button
    @click="like"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavorited,
      'btn-outline-primary': !isFavorited,
    }"
  >
    <i class="ion-heart" />
    <span>{{ inArticle ? '' : favoritesCount }}</span>
    <slot></slot>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'

export default {
  name: 'McvAddToFavorites',
  props: {
    inArticle: {
      type: Boolean,
      required: false,
      default: false,
    },
    isFavorited: {
      type: Boolean,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },
  methods: {
    like() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.slug,
        isFavorited: this.isFavorited,
      })
    },
  },
}
</script>
