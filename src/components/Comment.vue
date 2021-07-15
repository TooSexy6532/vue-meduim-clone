<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <router-link
        class="comment-author"
        :to="{name: 'userProfile', params: {slug: comment.author.username}}"
      >
        <img
          class="comment-author-img"
          :src="comment.author.image"
          alt="author avatar"
        />
      </router-link>
      <router-link
        class="comment-author"
        :to="{
          name: 'userProfile',
          params: {slug: comment.author.username},
        }"
      >
        {{ comment.author.username }}
      </router-link>
      <span class="date-posted">{{ comment.createdAt }}</span>
      <span class="mod-options" @click="$emit('deleteComment', comment.id)">
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'McvComment',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
}
</script>
