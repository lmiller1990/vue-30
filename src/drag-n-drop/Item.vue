<template>
  <div 
    draggable="true"
    :drag-key="dragKey"
    :key="dragKey"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    dragKey: {
      type: String,
      required: true
    }
  }
})
</script>