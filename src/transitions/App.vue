<template>
  <div class="flex items-center justify-center">
    <k-button @click="shuffle">
      Shuffle
    </k-button>

    <div class="w-full h-full">
      <transition-group name="cell" tag="div" class="h-full w-full grid grid-cols-3 gap-2 p-2">
        <div 
          v-for="cell in cells" 
          :key="cell.id" 
          class="rounded-md border border-blue-500 flex justify-center m-1 items-center w-full"
        >
          {{ cell.number }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import KButton from '../shared/k-button.vue'

  interface Tile {
    id: number
    number: number
  }

  const arr: Tile[] = []
  for (let id = 0; id < 9; id++) {
    arr.push({ id, number: id + 1 })
  }

  export default defineComponent({
    components: {
      KButton
    },

    setup() {
      function shuffle<T>(a: T[]) {
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]]
        }
        return a
      }

      const cells = ref(shuffle(arr))

      return {
        cells,
        shuffle: () => {
          cells.value = shuffle(cells.value)
        }
      }
    }
  })
</script>

<style scoped>
.cell-move {
  transition: transform 0.75s;
} 
</style>