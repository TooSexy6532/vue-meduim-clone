<template>
  <div class="setting-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <McvValidationErorrs :errors="validationErrors" />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.image"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.username"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="form.bio"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.email"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control form-control-lg"
                  placeholder="Password"
                />
              </fieldset>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="btn btn-lg btn-primary pull-xs-right"
              >
                Update settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import {actionTypes, getterTypes} from '@/store/modules/auth'
import McvValidationErorrs from '@/components/ValidationErrors'

export default {
  name: 'McvSettings',
  components: {McvValidationErorrs},
  computed: {
    ...mapState({
      isSubmitting: (state) => state.settings.isSubmitting,
      validationErrors: (state) => state.settings.validationErorrs,
    }),
    ...mapGetters({
      currentUser: getterTypes.currentUser,
    }),
    form() {
      return {
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        image: this.currentUser.image,
        email: this.currentUser.email,
        password: '',
      }
    },
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.updateCurrentUser, {
        currentUserInput: this.form,
      })
    },
    logout() {
      this.$store
        .dispatch(actionTypes.logout)
        .then(() => this.$router.push({name: 'home'}))
    },
  },
}
</script>
