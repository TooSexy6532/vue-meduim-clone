import authApi from '@/api/auth'
import { setItem } from '../../../utils/persistanceStorage'

const state = {
    isSubmitting: false,
    currentUser: null,
    validationErorrs: null,
    isLogedIn: null,
}

const mutations = {
    registerStart(state) {
        state.isSubmitting = true
        state.validationErorrs = null
    },
    registerSuccess(state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLogedIn = true
    },
    registerFailure(state, payload) {
        state.isSubmitting = false
        state.validationErorrs = payload
    }
}

const actions = {
    register(context, credentials) {
        return new Promise(resolve => {
            authApi
                .register(credentials)
                .then(response => {
                    context.commit('registerSuccess', response.data.user)
                    resolve(response.data.user)
                    setItem('acsessTocken', response.data.user.token)
                })
                .catch(result => {
                    context.commit('registerFailure', result.response.data.errors)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
    // getters
}
