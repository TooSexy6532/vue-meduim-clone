import axios from 'axios'
import {getItem} from '../../utils/persistanceStorage'
import {TOKEN} from '../../utils/vars'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

axios.interceptors.request.use((config) => {
  const token = getItem(TOKEN)
  const authorizationToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authorizationToken
  return config
})

export default axios
