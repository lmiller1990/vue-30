import { computed, ref } from 'vue'
import { TreeNode, FolderNode } from './TreeView.vue'

const data: TreeNode[] = [
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

const openFolders = ref<Set<string>>(new Set<string>())
const contents = ref<TreeNode[]>(data)

export function useTreeView() {
  const toggle = (content: FolderNode) => {
    if (openFolders.value.has(content.id)) {
      openFolders.value.delete(content.id)
    } else {
      openFolders.value.add(content.id)
    }
  }


  const reset = () => {
    contents.value = []
    openFolders.value.clear()
  }

  return {
    toggle,
    reset,
    contents,
    openFolders
  }
}