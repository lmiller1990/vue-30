<template>
  <p>Count is: {{ state.counter }}</p>
  <button @click="click">Inc</button>
  <p>Other: {{ other.name }}</p>
  <button @click="change">Change</button>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useMainStore, useOtherStore } from './index3'

export default {
  setup() {
    const store = useMainStore()
    const other = useOtherStore()
    return {
      click: () => store.inc(1),
      state: store.state,
      other: other.state,
      change: () => other.changeName()
    }
  },
}
</script>
