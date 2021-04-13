<template>
  <div class="m-6">
    <tree-view :contents="contents" />
  </div>
</template>

<script lang="ts">
import { computed, onUnmounted } from '@vue/runtime-core'
import TreeView from './TreeView.vue'
import { useTreeView } from './useTreeView'

export default {
  components: {
    TreeView
  },

  setup() {
    const treeView = useTreeView()

    onUnmounted(() => {
      treeView.reset()
    })

    return {
      contents: treeView.contents,
      folders: computed(() => treeView.openFolders)
    }
  }
}
</script>

<style>
</style>