<template>
  <p>Count is: {{ state.counter }}</p>
  <button @click="click">Inc</button>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useMainStore, useOtherStore } from './index3'

export default {
  setup() {
    const store = useMainStore()
    return {
      click: () => store.inc(1),
      state: store.state,
    }
  },
}
</script>
