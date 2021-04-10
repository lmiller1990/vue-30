<template>
  <div class="flex flex-col items-center">
    <k-button @click="shuffle">
      Shuffle
    </k-button>

    <div>
      <transition-group name="cell" tag="div" class="container">
        <div 
          v-for="cell in cells" 
          :key="cell.id" 
          class="rounded-md border border-blue-200 flex justify-center m-1"
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
  for (let id = 0; id < 15; id++) {
    arr.push({ id, number: id % 5 + 1 })
  }

  export default defineComponent({
    components: {
      KButton
    },

    setup() {
      const cells = ref(arr)

      function shuffle<T>(a: T[]) {
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]]
        }
        return a
      }

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
.container {
  display: grid;
  grid-template-columns: repeat(5, 35px);
}

.cell-move {
  transition: transform 0.75s;
} 
</style>