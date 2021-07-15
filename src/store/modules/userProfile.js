import userProfileApi from '@/api/userProfile'
import {mutationTypes as addToFavoriteMutationTypes} from '@/store/modules/addToFavorites'

const state = {
  data: null,
  isLoading: null,
  error: null,
}

export const mutationTypes = {
  getUserProfileStart: '[userProfile] Get userProfile start',
  getUserProfileSuccess: '[userProfile] Get userProfile success',
  getUserProfileFailure: '[userProfile] Get userProfile failure',
}

export const actionTypes = {
  getUserProfile: '[userProfile] Get userProfile',
}
const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getUserProfileFailure](state) {
    state.isLoading = false
  },
  [addToFavoriteMutationTypes.followUserSuccess](state, payload) {
    state.data = payload
  },
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getUserProfileStart)
      userProfileApi
        .getUserProfile(slug)
        .then((userProfile) => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(() => {
          context.commit(mutationTypes.getUserProfileFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
