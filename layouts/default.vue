<template lang="pug">
  .container
    Header
    main
      nuxt
</template>

<script>
import Header from "~/components/Header.vue"

export default {
  components: {
    Header
  }
}
</script>

<style lang="sass">
.container
  margin: 60px auto
</style>
