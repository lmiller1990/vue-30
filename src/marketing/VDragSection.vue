<template>
  <Section>
    <card> 
      <template v-slot:title>
        <h1 class="text-3xl">Sortable Component</h1>
      </template>

      <template v-slot:left>
        <div class="relative">
          <draggable v-model="list" class="bg-blue-200 h-full rounded-md">
            <transition-group 
              tag="div" 
              name="cells"
              class="h-full grid grid-cols-5 gap-3 content-box p-3"
            >
              <item 
                v-for="item in list"
                :key="item"
                :drag-key="item"
              >
                <div class="cursor-pointer h-full bg-white flex justify-center items-center rounded-md">
                  Item {{ item }}
                </div>
              </item>
            </transition-group>
          </draggable>
        </div>
      </template>

      <template v-slot:right>
        <div class="flex flex-col justify-center">
          <p>
            <div class="p-4 bg-gray-800 text-white whitespace-pre-wrap text-left rounded-lg">
              <div class="code" v-html="code" />
            </div>
          </p>
        </div>
      </template>
    </card>
  </Section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Section } from './sharedComponents'
import Card from './Card.vue'
import Draggable from '../drag-n-drop/Draggable.vue'
import Item from '../drag-n-drop/Item.vue'
import { highlightAuto } from 'highlight.js'

const code = `
<draggable v-model="list">
  <item v-for="item in list">
    Item {{ item }}
  </item>
</draggable>
`.trim()


export default defineComponent({
  components: {
    Item,
    Draggable,
    Section,
    Card,
  },

  setup() {
    return {
      code: highlightAuto(code).value,
      list: ref(Array.from({ length: 10 }, (e, i) => (i + 1).toString()))
    }
  }
})
</script>

<style scoped>
.cells-move {
  transition: transform 0.25s;
} 
</style>