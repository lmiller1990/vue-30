<template>
  <div class="m-16">
    <div 
      v-for="key in keys"
      :key="key.id"
    >
      {{ key.id }}. Key: {{ key.key }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useEventListener, useKeyPress } from '.'

export default {
  setup() {
    const keys = ref<Array<{ id: number, key: string }>>([])

    const handler = (event: KeyboardEvent) => {
      keys.value.push({ id: keys.value.length + 1, key: event.key })
    }

    const close = () => {
      console.log('Closing')
    }

    useKeyPress('Escape', close)

    return {
      keys
    }
  }
}
</script>

<style>
</style>