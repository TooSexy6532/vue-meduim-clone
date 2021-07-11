import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErorrs: null,
}

export const mutationTypes = {
  createArticleStart: '[createArticle] Create Article start',
  createArticleSuccess: '[createArticle] Create Article success',
  createArticleFailure: '[createArticle] Create Article failure',
}

export const actionTypes = {
  createArticle: '[createArticle] Create article',
}

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmiting = true
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmiting = false
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmiting = false
    state.validationErorrs = payload
  },
}

const actions = {
  [actionTypes.createArticle](context, {articleInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.createArticleStart)
      articleApi
        .createArticle(articleInput)
        .then((article) => {
          context.commit(mutationTypes.createArticleSuccess, article)
          resolve(article)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.createArticleFailure,
            result.response.data.errors
          )
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
