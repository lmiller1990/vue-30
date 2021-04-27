<template>
  {{ counter }}
  <button @click="click">Update</button>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useMainStore } from './index'

export default {
  setup() {
    const store = useMainStore()

    const click = () => {
      store.inc()
    }

    return {
      click,
      counter: computed(() => store.state.counter)
    }
  },
}
</script>

<style>
</style>
