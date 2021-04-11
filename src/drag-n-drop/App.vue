<template>
  <div class="relative">
    <draggable v-model="list">
      <transition-group 
        tag="div" 
        name="cells"
        class="flex flex-wrap drag-wrapper"
      >
        <item 
          v-for="item in list"
          :key="item"
          :drag-key="item"
        >
          <div class="bg-red-100 flex justify-center items-center text-xl m-2 w-20 h-20">
            #{{ item }}
          </div>
        </item>
      </transition-group>
    </draggable>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Draggable from './Draggable.vue'
  import Item from './Item.vue'

  export default defineComponent({
    components: { 
      Item,
      Draggable
    },

    setup() {
      // const list = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
      const list = ref(Array.from({ length: 20 }, (e, i) => i.toString()))

      return {
        list,
      }
    }
  })
</script>

<style scoped>
.drag-wrapper {
  width: 550px;
}

.cells-move {
  transition: transform 0.2s;
} 

</style>