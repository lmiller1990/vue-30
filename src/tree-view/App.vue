<template>
  <tree-view :contents="contents" />
</template>

<script lang="ts">
import TreeView, { TreeNode } from './TreeView.vue'

const contents: TreeNode[] = [
  {
    id: '1',
    type: 'file',
    name: 'README.md'
  },
  {
    id: '2',
    type: 'folder',
    name: 'src',
    contents: [
      {
        id: '3',
        type: 'file',
        name: 'main.ts'
      },
      {
        id: '4',
        type: 'folder',
        name: 'components',
        contents: [
          {
            id: '5',
            type: 'file',
            name: 'Button.vue',
          },
          {
            id: '6',
            type: 'file',
            name: 'TreeView.vue',
          },
        ]
      }
    ]
  }
]

export default {
  components: {
    TreeView
  },

  setup() {
    return {
      contents
    }
  }
}
</script>

<style>
</style>