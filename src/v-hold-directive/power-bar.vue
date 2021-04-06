<template>
  <div 
    class="wrapper rounded-md overflow-x-hidden"
    :style="{ width: `${width}px` }"
  >  
    <div 
      :style="style" 
      class="rounded-md power bg-red-200" 
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    min: Number,
    max: Number,
    power: Number
  },

  setup(props) {
    const style = computed(() => {
      const max = Math.min(props.power, props.max)
      return {
        width: `${max}px`
      }
    })


    return {
      width: props.max,
      style
    }
  }
})
</script>

<style scoped>
.wrapper {
  border: 1px solid black;
  height: 50px;
  position: relative;
}

.power {
  transition: 0.1s;
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
}
</style>
