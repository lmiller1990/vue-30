<template>
  <light-box 
    v-if="selectedImage"
    :images="images" 
    :default-image="selectedImage"
    @close="selectedImage = null"
  />
  <div class="flex h-36 flex-wrap">
    <img 
      v-for="src in images" 
      :key="src"
      :src="src"
      class="h-full m-2"
      @click="selectedImage = src"
    >
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import LightBox from './LightBox.vue'

export default {
  components: {
    LightBox
  },

  setup() {
    const selectedImage = ref()

    const images = [
      'echidna.jpg',
      'koala.webp',
      'wallaby.jpg',
      'emu.jpg',
      'kookabarra.jpg',
      'quokka.jpg',
    ]

    return {
      images,
      selectedImage
    }
  }
}
</script>

<style>
</style>