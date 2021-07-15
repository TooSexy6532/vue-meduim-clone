import axios from '@/api/axios'

const addToFavorites = (slug) => {
  return axios
    .post(`/articles/${slug}/favorite`)
    .then((response) => response.data.article)
}

const deleteFromFavorites = (slug) => {
  return axios
    .delete(`/articles/${slug}/favorite`)
    .then((response) => response.data.article)
}

export default {
  addToFavorites,
  deleteFromFavorites,
}
