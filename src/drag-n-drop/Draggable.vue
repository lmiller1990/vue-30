<template>
  <div
    @dragstart="dragstart"
    @dragend.prevent="dragend"
    @dragover.prevent="dragover"
    ref="root"
  >
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { inRect, InRectOptions } from './useDrag'

  export default defineComponent({
    props: {
      modelValue: {
        type: Array,
        required: true
      }
    },

    setup(props, ctx) {
      const root = ref<HTMLDivElement>()
      const dragItemId = ref<string | null>(null)
      let prev: string | null
      let $draggable: HTMLDivElement[] = []

      const getHoveredElement = (
        event: DragEvent,
        $els: HTMLDivElement[],
        exclude: string | null,
        options?: InRectOptions
      ) => {
        return $els.find($x => {
          const $cand = inRect(event, $x.getBoundingClientRect(), options)
          return $cand && $x.getAttribute('drag-key') !== exclude
        })
      }

      const dragstart = (event: DragEvent) => {
        const $els = Array.from(root.value!.querySelectorAll<HTMLDivElement>('[drag-key]'))
        const $in = getHoveredElement(event, $els, null)
        $draggable = $els

        if (!$in) {
          throw Error('Cannot identify item dragged')
        }

        dragItemId.value = $in.getAttribute('drag-key')
      }

      const dragover = (event: DragEvent) => {
        const $over = getHoveredElement(event, $draggable, dragItemId.value, {
          vThreshold: 0.9,
          hThreshold: 0.9
        })
        if ($over && prev !== $over.getAttribute('drag-key')) {
          prev = $over.getAttribute('drag-key')

          const indexOfSrc = props.modelValue.findIndex(x => x === dragItemId.value)
          const indexOfDest = props.modelValue.findIndex(x => x === prev)

          if (indexOfSrc < indexOfDest) {
            const newArr = props.modelValue.reduce<Array<any>>((acc, curr, index) => {
              if (index === indexOfSrc) {
                return acc
              }
              if (index === indexOfDest) {
                return acc.concat(curr, props.modelValue[indexOfSrc])
              }
              return acc.concat(curr)
            }, [])

            ctx.emit('update:modelValue', newArr)
          }

          if (indexOfSrc > indexOfDest) {
            const newArr = props.modelValue.reduce<Array<any>>((acc, curr, index) => {
              if (index === indexOfSrc) {
                return acc
              }
              if (index === indexOfDest) {
                return acc.concat(props.modelValue[indexOfSrc], curr)
              }
              return acc.concat(curr)
            }, [])

            ctx.emit('update:modelValue', newArr)
          }
        }

        if (prev && !$over) {
          prev = null
        }
      }


      const dragend = () => {
        dragItemId.value = null
      }

      return {
        dragend,
        dragover,
        dragstart,
        root
      }
    }
  })
</script>
