<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              <McvFollowUser :author="userProfile">
                {{
                  userProfile.following
                    ? 'Unfollow' + ' ' + userProfile.username
                    : 'Follow' + ' ' + userProfile.username
                }}
              </McvFollowUser>
              <router-link
                v-if="isCurrentUserProfile"
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{name: 'settings'}"
              >
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfile',
                    params: {slug: userProfile.username},
                  }"
                  class="nav-link"
                  :class="{active: routeName === 'userProfile'}"
                >
                  User Posts
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfileFavorites',
                    params: {slug: userProfile.username},
                  }"
                  class="nav-link"
                  :class="{active: routeName === 'userProfileFavorites'}"
                >
                  Favorites Posts
                </router-link>
              </li>
            </ul>
          </div>
          <McvMainFeed :apiUrl="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import McvMainFeed from '@/components/MainFeed'
import {actionTypes} from '@/store/modules/userProfile'
import {getterTypes} from '@/store/modules/auth'
import McvFollowUser from '@/components/FollowUser'

export default {
  name: 'McvUserProfile',
  components: {McvFollowUser, McvMainFeed},
  computed: {
    ...mapState({
      isLoading: (state) => state.userProfile.isLoading,
      erorrs: (state) => state.userProfile.erorrs,
      userProfile: (state) => state.userProfile.data,
    }),
    ...mapGetters({
      currentUser: getterTypes.currentUser,
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false
      }
      return this.userProfile.username === this.currentUser.username
    },
    userProfileSlug() {
      return this.$route.params.slug
    },
    apiUrl() {
      const path = this.$route.path.includes('favorites')
      return path
        ? `/articles?favorited=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`
    },
    routeName() {
      return this.$route.name
    },
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile()
    },
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch(actionTypes.getUserProfile, {
        slug: this.userProfileSlug,
      })
    },
  },
}
</script>
