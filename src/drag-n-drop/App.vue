<template>
  <div class="relative">
    <Item />
  </div>
</template>

<script lang="ts">
  import { defineComponent, FunctionalComponent, h, ref } from 'vue'
  import Item from './Draggable.vue'

  export default defineComponent({
    components: { 
      Item 
    },

    setup() {
    }
  })
</script>

<style scoped>
</style>