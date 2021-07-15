<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form" @submit.prevent="addComment">
        <div class="card-block">
          <textarea
            v-model="commentInput"
            rows="3"
            class="form-control"
            placeholder="Write a comment..."
          >
          </textarea>
          <div class="card-footer">
            <img :src="currentUser.image" class="comment-author-img" />
            <button class="btn btn-sm btn-primary" type="submit">
              Post comment
            </button>
          </div>
        </div>
      </form>
      <McvComment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @deleteComment="deleteComment"
      />
    </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/comments'
import {mapState} from 'vuex'
import McvComment from '@/components/Comment'

export default {
  name: 'McvComments',
  components: {McvComment},
  data() {
    return {
      commentInput: '',
    }
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      isLoading: (state) => state.comments.isLoading,
      comments: (state) => state.comments.data,
      errors: (state) => state.comments.errors,
    }),
  },
  created() {
    this.$store.dispatch(actionTypes.getComments, this.$route.params.slug)
  },
  methods: {
    addComment() {
      this.$store.dispatch(actionTypes.addComments, {
        slug: this.$route.params.slug,
        comment: this.commentInput,
      })
      this.commentInput = ''
    },
    deleteComment(id) {
      this.$store.dispatch(actionTypes.deleteComments, {
        slug: this.$route.params.slug,
        commentId: id,
      })
    },
  },
}
</script>
