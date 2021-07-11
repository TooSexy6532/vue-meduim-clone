import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErorrs: null,
  isLoading: false,
  article: null,
}

export const mutationTypes = {
  updateArticleStart: '[updateArticle] Update Article start',
  updateArticleSuccess: '[updateArticle] Update Article success',
  updateArticleFailure: '[updateArticle] Update Article failure',

  getArticleStart: '[getArticle] Get Article start',
  getArticleSuccess: '[getArticle] Get Article success',
  getArticleFailure: '[getArticle] Get Article failure',
}

export const actionTypes = {
  updateArticle: '[updateArticle] Update article',
  getArticle: '[getArticle] Get article',
}

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmiting = true
  },
  [mutationTypes.updateArticleSuccess](state, payload) {
    state.isSubmiting = false
    state.article = payload
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmiting = false
    state.validationErorrs = payload
  },
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.article = payload
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.updateArticle](context, {slug, articleInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateArticleStart)
      articleApi
        .updateArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationTypes.updateArticleSuccess, article)
          resolve(article)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateArticleFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart)
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
