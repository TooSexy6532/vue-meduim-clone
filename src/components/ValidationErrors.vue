<template>
  <ul class="error-messages">
    <li v-for="errorMessage in errorMessages" :key="errorMessage">
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McvValidationErorrs',
  props: {
    errors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.keys(this.errors).map((name) => {
        const messages = this.errors[name].join(', ')
        return `${name} ${messages}`
      })
    },
  },
}
</script>
