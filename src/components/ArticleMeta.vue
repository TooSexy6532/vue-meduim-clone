<template>
  <div class="article-meta">
    <router-link
      :to="{name: 'userProfile', params: {slug: article.author.username}}"
    >
      <img :src="article.author.image" alt="author avatar" />
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
    <template v-if="!isAuthor">
      <McvFollowUser :author="article.author">
        {{
          article.author.following
            ? 'Unfollow' + ' ' + article.author.username
            : 'Follow' + ' ' + article.author.username
        }}
      </McvFollowUser>
      <McvAddToFavorites
        :inArticle="true"
        :isFavorited="article.favorited"
        :favoritesCount="article.favoritesCount"
        :slug="article.slug"
      >
        {{
          article.favorited
            ? 'Unfavorite article' + ' ' + article.favoritesCount
            : 'Favorite article' + ' ' + article.favoritesCount
        }}
      </McvAddToFavorites>
    </template>

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
        @click="$emit('deleteArticle')"
      >
        <i class="ion-trash-a" />
        Delete article
      </button>
    </span>
  </div>
</template>

<script>
import McvAddToFavorites from '@/components/AddToFavorites'
import McvFollowUser from '@/components/FollowUser'

export default {
  name: 'McvArticleMeta',
  components: {McvFollowUser, McvAddToFavorites},
  props: {
    article: {
      type: Object,
      required: true,
    },
    isAuthor: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['deleteArticle'],
}
</script>
