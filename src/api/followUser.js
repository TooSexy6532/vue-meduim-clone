import axios from '@/api/axios'

const addToFollow = (author) => {
  return axios
    .post(`/profiles/${author}/follow`)
    .then((response) => response.data.profile)
}

const deleteFromFollow = (author) => {
  return axios
    .delete(`/profiles/${author}/follow`)
    .then((response) => response.data.profile)
}

export default {
  addToFollow,
  deleteFromFollow,
}
