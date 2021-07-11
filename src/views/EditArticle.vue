<template>
  <div>
    <McvLoading v-if="isLoading" />
    <McvArticleForm
      v-if="initialValues"
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm'
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/editArticle'
import McvLoading from '@/components/Loading'

export default {
  name: 'McvEditArticle',
  components: {McvLoading, McvArticleForm},
  computed: {
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      validationErrors: (state) => state.editArticle.validationErorrs,
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.editArticle.article,
    }),
    initialValues() {
      if (!this.article) {
        return null
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      }
    },
  },
  created() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    })
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug
      this.$store
        .dispatch(actionTypes.updateArticle, {slug, articleInput})
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}})
        })
    },
  },
}
</script>
