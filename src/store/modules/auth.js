import authApi from '@/api/auth'
import {setItem} from '../../../utils/persistanceStorage'
import {TOKEN} from '../../../utils/vars'

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErorrs: {},
  isLogedIn: null,
}
export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',

  updateCurrentUserStart: '[auth] updateCurrentUserStart',
  updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
  updateCurrentUserFailure: '[auth] updateCurrentUserFailure',

  logout: '[auth] logout',
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser',
  logout: '[auth] logout',
}

export const getterTypes = {
  isLogedIn: '[auth] isLogedIn',
  isAnonymous: '[auth] isAnonymous',
  currentUser: '[auth] currentUser',
}

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser
  },
  [getterTypes.isLogedIn]: (state) => {
    return Boolean(state.isLogedIn)
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLogedIn === false
  },
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErorrs = {}
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLogedIn = true
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErorrs = payload
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErorrs = {}
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLogedIn = true
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErorrs = payload
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLogedIn = true
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false
    state.isLogedIn = false
    state.currentUser = null
  },
  [mutationTypes.updateCurrentUserStart]() {},
  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload
  },
  [mutationTypes.updateCurrentUserFailure]() {},

  [mutationTypes.logout](state) {
    state.currentUser = null
    state.isLogedIn = false
  },
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart)
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data.user)
          resolve(response.data.user)
          setItem(TOKEN, response.data.user.token)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.registerFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart)
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSuccess, response.data.user)
          resolve(response.data.user)
          setItem(TOKEN, response.data.user.token)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.loginFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart)
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          )
          resolve(response.data.user)
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure)
        })
    })
  },
  [actionTypes.updateCurrentUser](context, {currentUserInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateCurrentUserStart)
      authApi
        .updateCurrentUser(currentUserInput)
        .then((user) => {
          context.commit(mutationTypes.updateCurrentUserSuccess, user)
          resolve(user)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateCurrentUserFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.logout](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.logout)
      setItem(TOKEN, '')
      resolve()
    })
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
