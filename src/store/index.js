import {createStore} from 'vuex'
import feed from '@/store/modules/feed'
import auth from '@/store/modules/auth'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
  },
})
