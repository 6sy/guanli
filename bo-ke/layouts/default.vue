<template>
  <div class='app'>
    <headTop></headTop>
    <nuxt />
    <bottom></bottom>
  </div>
</template>
<script>
import head from '../components/head/head'
import bottom from '../components/bottom/bottom'
export default {
  created () {
  },
  components: {
    headTop: head,
    bottom
  },
  watch: {
    $route: function (newVal, oldVal) {
      console.log(newVal)
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.app {
  width: 100%;
  height: 100%;
  background: #e9e9e9;
}
</style>
