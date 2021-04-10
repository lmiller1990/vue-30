<template>
  <div 
    :class="`circle bg-${bg}-${holding ? 600 : 500} flex justify-center items-center text-white font-bold m-2 shadow-lg`"
    :style="style"
    v-hold:[interval]="handle"
    @mousedown="mousedown"
    @mouseup="holding = false"
    @mouseleave="holding = false"
  >  
    <div class="flex flex-col items-center">
      <p>Ticks: {{ ticks }}</p>
      <p>Interval: {{ interval }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { props } from 'cypress/types/bluebird'
import { defineComponent, ref } from 'vue'
import { hold } from './v-hold'

export default defineComponent({
  props: ['bg', 'interval', 'size', 'override'],

  directives: {
    hold
  },

  setup(props) {
    const ticks = ref(0)
    const holding = ref(false)

    const mousedown = () => {
      ticks.value = 0
      holding.value = true
    }

    const handle = (count: number) => {
      ticks.value += 1
    }

    const style = {
      height: `${props.size}px`,
      width: `${props.size}px`,
    }

    return {
      ticks,
      style,
      mousedown,
      handle,
      holding
    }
  }
})
</script>

<style scoped>
.circle {
  border-radius: 50%;
}
</style>
