<template>
  {{ counter }}
  <button @click="click">Update</button>
  {{ other.name }}
  <button @click="update">Change name</button>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useMainStore, useOtherStore } from './index2'

export default {
  setup() {
    const store = useMainStore()
    const other = useOtherStore()

    const click = () => {
      store.inc()
    }

    return {
      click,
      update: () => {
        other.changeName()
      },
      counter: computed(() => store.state.counter),
      other: other.state
    }
  },
}
</script>

<style>
</style>
