<template>
  <div class="flex flex-col items-center">
    <h1 class="text-6xl p-12">v-hold custom directive</h1>
    <div class="flex justify-center m-8">
      <v-circle :interval="10" bg="green"/>
      <v-circle :interval="100" bg="red" />
      <v-circle :interval="250" bg="blue" />
    </div>

    <power-bar />
  </div>
</template>

<script lang="ts">
import PowerBar from './power-bar.vue'
import VCircle from './v-circle.vue'

export default {
  components: {
    PowerBar,
    VCircle,
  },
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