import addToFavoriteApi from '@/api/addToFavorite'
import followUserApi from '@/api/followUser'

export const mutationTypes = {
  addToFavoritesStart: '[addToFavorites] Add to favorites start',
  addToFavoritesSuccess: '[addToFavorites] Add to favorites success',
  addToFavoritesFailure: '[addToFavorites] Add to favorites failure',

  followUserStart: '[followUser] followUser start',
  followUserSuccess: '[followUser] followUser success',
  followUserFailure: '[followUser] followUser failure',
}

export const actionTypes = {
  addToFavorites: '[addToFavorites] Add to favorites',
  followUser: '[followUser] followUser',
}

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailure]() {},

  [mutationTypes.followUserStart]() {},
  [mutationTypes.followUserSuccess]() {},
  [mutationTypes.followUserFailure]() {},
}

const actions = {
  [actionTypes.addToFavorites](context, {slug, isFavorited}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.addToFavoritesStart)
      const promise = isFavorited
        ? addToFavoriteApi.deleteFromFavorites(slug)
        : addToFavoriteApi.addToFavorites(slug)

      promise
        .then((article) => {
          context.commit(mutationTypes.addToFavoritesSuccess, article)
          resolve(article)
        })
        .catch(() => context.commit(mutationTypes.addToFavoritesFailure))
    })
  },
  [actionTypes.followUser](context, {authorName, isFollowed}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.followUserStart)
      const promise = isFollowed
        ? followUserApi.deleteFromFollow(authorName)
        : followUserApi.addToFollow(authorName)

      promise
        .then((author) => {
          context.commit(mutationTypes.followUserSuccess, author)
          resolve(author)
        })
        .catch(() => context.commit(mutationTypes.followUserFailure))
    })
  },
}

export default {
  actions,
  mutations,
}
