<template>
  <div 
    v-for="content in contents"
    :key="content.id"
  >
    <label :style="style" :class="classFor(content)">
      <span 
        v-if="content.type === 'folder'"
        @click="toggle(content)"
      >
        {{ isOpen(content) ? 'v' : '>' }}
      </span>

      {{ content.name }}
    </label>

    <tree-view 
      v-if="content.type === 'folder' && isOpen(content)"
      :contents="content.contents"
      :depth="depth + 1"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, CSSProperties } from 'vue'
import { useTreeView } from './useTreeView'

interface FileNode {
  id: string
  type: 'file'
  name: string
}

export interface FolderNode {
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

    const treeView = useTreeView()

    const isOpen = (content: FolderNode) => {
      return treeView.openFolders.value.has(content.id)
    }

    const classFor = (node: TreeNode) => {
      if (node.type === 'file') {
        return 'border-l border-black pl-2'
      }

      return 'pl-2'
    }

    return {
      toggle: treeView.toggle,
      isOpen,
      classFor,
      style
    }
  },
})
</script>

<style scoped>
</style>
