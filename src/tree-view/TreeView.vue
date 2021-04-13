<template>
  <div 
    v-for="content in contents"
    :key="content.id"
  >
    <div 
      :style="style" 
      @click.stop="toggle(content)"
      class="cursor-pointer hover:bg-gray-200 py-1"
    >
      <span 
        v-if="content.type === 'folder'"
      >
        <img 
          alt="icon name"
          class="mr-2"
          :src="`/src/open-iconic-master/svg/chevron-${isOpen(content) ? 'bottom' : 'right'}.svg`" 
        > 
      </span>

      {{ content.name }}
    </div>

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
      default: 1
    },

    contents: {
      type: Array as () => TreeNode[],
      default: []
    }
  },

  setup(props) {
    const style: CSSProperties = {
      paddingLeft: `${props.depth * 15}px`
    }

    const treeView = useTreeView()

    const isOpen = (content: FolderNode) => {
      return treeView.openFolders.value.has(content.id)
    }

    return {
      toggle: treeView.toggle,
      isOpen,
      style
    }
  },
})
</script>

<style scoped>
  img {
    height: 12px;
    width: 12px;
    display: inline;
  }
</style>
