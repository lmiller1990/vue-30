<template>
  <button 
    class="mb-2 py-2 px-4 rounded-lg"
    :class="className"
  >
    <slot />
  </button> 
</template>


<script lang="ts">
import cs from 'classnames'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'k-button',

  props: {
    bg: {
      type: String as () => 'gray',
      default: 'gray'
    },
    weight: {
      type: Number as () => 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
      default: 200
    }
  },

  setup(props) {
    const className = computed(() => cs(`bg-${props.bg}-${props.weight} active:bg-${props.bg}-${props.weight + 100}`))

    return {
      className
    }
  }
})

</script>

<style scoped>
</style>