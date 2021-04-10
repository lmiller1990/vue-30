<template>
  <div 
    class="bg-blue-300 w-20"
    ref="target"
    :style="style"
  >
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
  import { useMouse, useMouseInElement } from '@vueuse/core'

  export default defineComponent({
    setup() {
      const target = ref()

      const { x, y, isOutside } = useMouseInElement(target)

      const style = computed(() => {
        console.log(x.value, y.value)
        if (isOutside.value) {
          return
        }

        return {
          top: `${x.value}px`,
          left: `${y.value}px`,
        }
      })

      return {
        target,
        style
      }
    }
  })
</script>
