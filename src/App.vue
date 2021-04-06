<template>
  <v-hold-app />
</template>

<script lang="ts">
import VHoldApp from './v-hold-directive/App.vue'

export default {
  components: {
    VHoldApp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>