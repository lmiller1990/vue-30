<template>
  <div 
    v-for="content in contents"
    :key="content.id"
  >
    <label :style="style" :class="classFor(content)">
      <span v-if="content.type === 'folder'">
        >
      </span>

      {{ content.name }}
    </label>

    <tree-view 
      v-if="content.type === 'folder'"
      :contents="content.contents"
      :depth="depth + 1"
    />
  </div>
</template>

<script lang="ts">
import { ref, watchEffect, defineComponent, CSSProperties } from 'vue'

interface FileNode {
  id: string
  type: 'file'
  name: string
}

interface FolderNode {
  id: string
  type: 'folder'
  name: string
  contents: TreeNode[]
}

export type TreeNode = FileNode | FolderNode

export default defineComponent({
  name: 'TreeView',

  props: {
    depth: {
      type: Number,
      default: 0
    },

    contents: {
      type: Array as () => TreeNode[],
      default: []
    }
  },

  setup(props) {
    const style: CSSProperties = {
      marginLeft: `${props.depth * 15}px`
    }

    const classFor = (node: TreeNode) => {
      if (node.type === 'file') {
        return 'border-l border-black pl-2'
      }

      return 'pl-2'
    }

    return {
      classFor,
      style
    }
  },
})
</script>

<style scoped>
</style>
