import {mutationTypes as authMutationTypes} from '@/store/modules/auth'

const state = {
  isSubmitting: false,
  validationErorrs: {},
}

const mutations = {
  [authMutationTypes.updateCurrentUserStart](state) {
    state.isSubmitting = true
    state.validationErorrs = {}
  },
  [authMutationTypes.updateCurrentUserSuccess](state) {
    state.isSubmitting = false
  },
  [authMutationTypes.updateCurrentUserFailure](state, payload) {
    state.isSubmitting = false
    state.validationErorrs = payload
  },
}

export default {
  state,
  mutations,
}
