import commentsApi from '@/api/comments'

const state = {
  data: [],
  isLoading: null,
  erorrs: null,
}

export const mutationTypes = {
  getCommentsStart: '[comments] get commentsStart',
  getCommentsSuccess: '[comments] get commentsSuccess',
  getCommentsFailure: '[comments] get commentsFailure',

  addCommentsStart: '[comments] add commentsStart',
  addCommentsSuccess: '[comments] add commentsSuccess',
  addCommentsFailure: '[comments] add commentsFailure',

  deleteCommentsStart: '[comments] delete commentsStart',
  deleteCommentsSuccess: '[comments] delete commentsSuccess',
  deleteCommentsFailure: '[comments] delete commentsFailure',
}

export const actionTypes = {
  getComments: '[comments] get comments',
  addComments: '[comments] add comments',
  deleteComments: '[comments] delete comments',
}

const mutations = {
  [mutationTypes.getCommentsStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCommentsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getCommentsFailure](state, payload) {
    state.isLoading = false
    state.erorrs = payload
  },

  [mutationTypes.addCommentsStart](state) {
    state.isLoading = true
  },
  [mutationTypes.addCommentsSuccess](state, payload) {
    state.isLoading = false
    state.data.unshift(payload)
  },
  [mutationTypes.addCommentsFailure](state, payload) {
    state.isLoading = false
    state.erorrs = payload
  },

  [mutationTypes.deleteCommentsStart](state) {
    state.isLoading = true
  },
  [mutationTypes.deleteCommentsSuccess](state, payload) {
    state.isLoading = false

    const comments = Object.assign([], state.data)
    const index = comments.findIndex((comment) => comment.id === payload)
    if (index !== -1) {
      state.data.splice(index, 1)
    }
  },
  [mutationTypes.deleteCommentsFailure](state, payload) {
    state.isLoading = false
    state.erorrs = payload
  },
}

const actions = {
  [actionTypes.getComments](context, slug) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCommentsStart)
      commentsApi
        .getComments(slug)
        .then((comments) => {
          context.commit(mutationTypes.getCommentsSuccess, comments)
          resolve(comments)
        })
        .catch(() => {
          context.commit(mutationTypes.getCommentsFailure)
        })
    })
  },
  [actionTypes.addComments](context, {slug, comment}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.addCommentsStart)
      commentsApi
        .addComment(slug, comment)
        .then((comment) => {
          context.commit(mutationTypes.addCommentsSuccess, comment)
          resolve(comment)
        })
        .catch(() => {
          context.commit(mutationTypes.deleteCommentsFailure)
        })
    })
  },
  [actionTypes.deleteComments](context, {slug, commentId}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.deleteCommentsStart)
      commentsApi
        .deleteComment(slug, commentId)
        .then(() => {
          context.commit(mutationTypes.deleteCommentsSuccess, commentId)
          resolve()
        })
        .catch(() => {
          context.commit(mutationTypes.deleteCommentsFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
