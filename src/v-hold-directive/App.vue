<template>
  <div class="flex flex-col items-center">
    <h1 class="text-6xl p-12">v-hold custom directive</h1>
    <div class="flex justify-center m-8">
      <v-circle :interval="10" bg="green"/>
      <v-circle :interval="100" bg="red" />
      <v-circle :interval="250" bg="blue" />
    </div>

    <k-button 
      v-hold:[25]="handleHold"
      @mouseup="shouldDrain = true"
      @mouseleave="shouldDrain = true"
    >
      Power Up
    </k-button>
    <power-bar 
      :power="power" 
      :min="0" 
      :max="MAX_POWER"
    />
  </div>
</template>

<script lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { hold } from './v-hold'
import PowerBar from './power-bar.vue'
import VCircle from './v-circle.vue'
import KButton from '../shared/k-button.vue'

export default {
  components: {
    PowerBar,
    VCircle,
    KButton
  },

  directives: {
    hold
  },

  setup() {
    const DRAIN_RATE = 10
    const MAX_POWER = 750

    let drainInterval: number
    const power = ref(500)
    const shouldDrain = ref(true)

    onMounted(() => {
      drainInterval = setInterval(drainPower, 50)
    })

    const drainPower = () => {
      if (power.value <= 0) {
        power.value = 0
        shouldDrain.value = false
        return
      } 

      if (!shouldDrain.value) {
        return
      }

      power.value = power.value - DRAIN_RATE
    }

    const handleHold = (ticks: number) => {
      if (power.value >= MAX_POWER || (power.value + ticks) >= MAX_POWER) {
        power.value = MAX_POWER
        return
      }

      shouldDrain.value = false
      power.value = power.value + ticks
    }

    onUnmounted(() => {
      clearInterval(drainInterval)
    })

    return {
      handleHold,
      power,
      shouldDrain,
      MAX_POWER,
    }
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