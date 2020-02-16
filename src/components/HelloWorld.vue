<template>
  <h1 v-cloak>{{ msg }}</h1>
</template>

<script>
  export default {
    name: "HelloWorld",
    data () {
      return {
        msg: 'Hello, world'
      };
    }
  }
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }
</style>
