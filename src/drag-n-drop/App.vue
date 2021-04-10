<template>
  <transition-group 
    tag="div" 
    class="flex"
    name="cells"
    @dragstart="dragstart"
    @dragover="dragover"
  >
    <div 
      v-for="(item, idx) in items" 
      :ref="el => setEl(el, idx)"
      :key="item.id"
      class="p-4 bg-blue-300 m-2 w-12 flex justify-center"
      draggable="true"
    >
      {{ item.id }}
    </div>
  </transition-group>
</template>

<script lang="ts">
  import { isTypedArray } from 'cypress/types/lodash'
import { ComponentInternalInstance, defineComponent, FunctionalComponent, h, reactive, Ref, ref } from 'vue'
  import Item from './Draggable.vue'

  interface DraggableItem {
    id: string
    ref: ComponentInternalInstance | Element | undefined
  }

  export default defineComponent({
    components: { 
      Item 
    },

    setup() {
      const items: Ref<DraggableItem[]> = ref([])
      const draggingId = ref<string>()
      const state = reactive<{ inTrans: boolean, targetId: string | undefined, timeoutId: number | undefined }>({
        inTrans: false,
        targetId: undefined,
        timeoutId: undefined
      })

      for (let i = 0; i < 5; i++) {
        items.value.push({ id: (i + 1).toString(), ref: undefined })
      }

      const getDelta = (event: MouseEvent, element: HTMLDivElement) => {
        const rect = element.getBoundingClientRect()
        const dx = Math.abs(rect.x + rect.width / 2 - event.pageX)
        const dy = Math.abs(rect.y + (rect.height / 2) - event.pageY)
        const delta = Math.sqrt((dx ** 2) + (dy ** 2))
        return Math.round(delta)
      }

      const getClosestElement = (event: MouseEvent, items: Ref<DraggableItem[]>) => {
        const best = items.value.reduce<{ dist: number, index: number }>((acc, curr, index) => {
          const delta = getDelta(event, curr.ref as HTMLDivElement)
          if (delta < acc.dist) {
            return { dist: delta, index }
          }
          return acc
        }, { dist: Infinity, index: 0 })

        return items.value[best.index].id
      }

      const inRect = (event: DragEvent, rect: DOMRect) => {
        return event.pageX > rect.x 
          && event.pageX < rect.x + rect.width
          && event.pageY > rect.y
          && event.pageY < rect.y + rect.height
      }

      const dragover = (event: DragEvent) => {
        event.preventDefault()

        const best = getClosestElement(event, items)
        if (best === draggingId.value) {
          return
        }

        const element = items.value.find(x => x.id === best)
        
        if (!element || !inRect(event, (element.ref as HTMLDivElement).getBoundingClientRect())) {
          return
        }

        const originalIndex = items.value.findIndex(el => el.id === draggingId.value)
        const destinationIndex =  items.value.findIndex(el => el.id === best)

        console.log(state.inTrans, state.targetId, state.timeoutId)
        if (state.inTrans && state.targetId === items.value[destinationIndex].id) {
          return
        }

        if (items.value[destinationIndex].id !== state.targetId) {
          clearTimeout(state.timeoutId)
        }

        state.inTrans = true

        state.timeoutId = setTimeout(() => {
          state.inTrans = false
        }, 500)

        state.targetId = element.id
        const temp = items.value[originalIndex]
        items.value[originalIndex] = items.value[destinationIndex]
        items.value[destinationIndex] = temp
        console.log(`after: ${items.value.map(x => x.id).join(',')}`)
      }

      const dragstart = (event: DragEvent) => {
        draggingId.value = getClosestElement(event, items)
      }


      return {
        draggingId,
        dragover,
        dragstart,
        setEl: (el: Element | ComponentInternalInstance | null, index: number) => {
          console.log('Set el')
          if (el) {
            items.value[index].ref = el
          }
        },
        items
      }
    }
  })
</script>

<style scoped>
.cells-move {
  transition: transform 0.5s;
} 
</style>