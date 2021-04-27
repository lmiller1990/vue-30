<template>
  {{ state.counter }}
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
      state: computed(() => store.$state)
    }
  },
}
</script>

<style>
</style>
