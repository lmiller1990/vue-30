<template>
    <div 
      class="bg-blue-300"
      @dragstart="dragstart"
      @dragend.prevent="dragend"
      @dragover.prevent="dragover"
      ref="root"
    >
      <slot @enter="enter" />
    </div>

  <h1>debug</h1>
  {{ dragItemId }}
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { inRect, useDrag } from './useDrag'

  export default defineComponent({
    props: {
      modelValue: {
        type: Array,
        required: true
      }
    },

    setup(props, ctx) {
      const store = useDrag()
      const root = ref<HTMLDivElement>()
      let prev: string | null
      let $draggable: HTMLDivElement[] = []

      const getHoveredElement = (event: DragEvent, $els: HTMLDivElement[], exclude?: string | null) => {
        return $els.find($x => {
          const $cand = inRect(event, $x.getBoundingClientRect())
          return $cand && $x.getAttribute('drag-key') !== exclude
        })
      }

      const dragstart = (event: DragEvent) => {
        const $els = Array.from(root.value!.querySelectorAll<HTMLDivElement>('[drag-key]'))
        const $in = getHoveredElement(event, $els)
        $draggable = $els

        if (!$in) {
          throw Error('Cannot identify item dragged')
        }

        store.dragItemId.value = $in.getAttribute('drag-key')
      }

      const dragover = (event: DragEvent) => {
        const $over = getHoveredElement(event, $draggable, store.dragItemId.value)
        if ($over && prev !== $over.getAttribute('drag-key')) {
          prev = $over.getAttribute('drag-key')

          const indexOfSrc = props.modelValue.findIndex(x => x === store.dragItemId.value) 
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

            console.log(newArr)
            ctx.emit('update:modelValue', newArr)
          }
        }

        if (prev && !$over) {
          prev = null
        }

        // console.log('dragover', event.target)
      }

      // store.bus.subscribe('swap', ({ dragSrcKey, dragDestKey}: { dragSrcKey: string, dragDestKey: string }) => {
      //   const indexOfSrc = props.modelValue.findIndex(x => x === dragSrcKey) 
      //   const indexOfDest = props.modelValue.findIndex(x => x === dragDestKey) 

      //   // coming before dest
      //   if (indexOfSrc < indexOfDest) {
      //     const newArr = props.modelValue.reduce<Array<any>>((acc, curr, index) => {
      //       if (index === indexOfSrc) {
      //         return acc
      //       }
      //       if (index === indexOfDest) {
      //         return acc.concat(curr, props.modelValue[indexOfSrc])
      //       }
      //       return acc.concat(curr)
      //     }, [])

      //     ctx.emit('update:modelValue', newArr)
      //   }

      //   if (indexOfSrc > indexOfDest) {
      //     console.log(`${dragSrcKey}, ${dragDestKey}`)
      //     const newArr = props.modelValue.reduce<Array<any>>((acc, curr, index) => {
      //       if (index === indexOfSrc) {
      //         return acc
      //       }
      //       if (index === indexOfDest) {
      //         return acc.concat(props.modelValue[indexOfSrc], curr)
      //       }
      //       return acc.concat(curr)
      //     }, [])

      //     console.log(newArr)
      //     ctx.emit('update:modelValue', newArr)
      //   }
      // })

      const dragend = (event: MouseEvent) => {
        store.dragItemId.value = null
        console.log('Dragend')
      }

      return {
        dragItemId: store.dragItemId,
        dragend,
        dragover,
        dragstart,
        root
      }
    }
  })
</script>
