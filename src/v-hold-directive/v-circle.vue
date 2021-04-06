<template>
  <div 
    :class="`circle bg-${bg}-${holding ? 600 : 500} flex justify-center items-center text-white font-bold text-3xl m-2`"
    v-hold:[interval]="handle"
    @mousedown="mousedown"
    @mouseup="holding = false"
    @mouseleave="holding = false"
  >  
    <div class="flex flex-col">
      <p>Ticks: {{ ticks }}</p>
      <p>Interval: {{ interval }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { hold } from './v-hold'

export default defineComponent({
  props: ['bg', 'interval'],

  directives: {
    hold
  },

  setup() {
    const ticks = ref(0)
    const holding = ref(false)

    const mousedown = () => {
      ticks.value = 0
      holding.value = true
    }

    const handle = (count: number) => {
      ticks.value += 1
    }

    return {
      ticks,
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
  width: 250px;
  height: 250px;
}
</style>
