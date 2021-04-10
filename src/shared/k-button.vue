<template>
  <button 
    class="mb-2 py-2 px-4 rounded-lg disabled:opacity-50"
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
    override: {
      type: String,
      default: ''
    },
    wide: {
      type: Boolean,
      default: false
    },
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
    const className = computed(() => cs(
      props.override,
      `bg-${props.bg}-${props.weight}`,
      `active:bg-${props.bg}-${props.weight + 100}`,
      {
        'w-full': props.wide
      }
    ))

    return {
      className
    }
  }
})

</script>

<style scoped>
</style>