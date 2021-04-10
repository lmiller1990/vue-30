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
  <k-button 
    v-hold:[25]="handleHold"
    @mouseup="shouldDrain = true"
    @mouseleave="shouldDrain = true"
    override="my-2"
    wide
  >
    hold to power up
  </k-button>

</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { hold } from './v-hold'
import KButton from '../shared/k-button.vue'

export default defineComponent({
  props: {
    ratio: {
      type: Number,
      default: 1
    }
  },

  directives: {
    hold
  },

  components: {
    KButton
  },

  setup(props) {
    const DRAIN_RATE = 10 / props.ratio
    const MAX_POWER = 750 / props.ratio

    let drainInterval: number
    const power = ref(500 / props.ratio)
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

    const style = computed(() => {
      const max = Math.min(power.value, MAX_POWER)
      return {
        width: `${max}px`
      }
    })


    return {
      width: MAX_POWER,
      style,
      handleHold,
      power,
      shouldDrain,
      MAX_POWER,
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
