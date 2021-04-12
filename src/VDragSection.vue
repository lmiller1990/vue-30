<template>
  <Section>
    <card> 
      <template v-slot:title>
        <h1 class="text-3xl">Sortable List</h1>
      </template>

      <template v-slot:left>
        <div class="flex flex-col justify-center">
          <p>
            <div class="p-4 bg-gray-800 text-white whitespace-pre-wrap text-left rounded-lg">
              <div class="code" v-html="vHoldCode" />
            </div>
          </p>
        </div>
      </template>

      <template v-slot:right>
        <div class="relative">
          <draggable v-model="list" class="bg-blue-200 h-full">
            <transition-group 
              tag="div" 
              name="cells"
              class="h-full grid grid-cols-3 gap-2 content-box p-2"
            >
              <!-- class="flex flex-wrap drag-wrapper h-full" -->
              <item 
                v-for="item in list"
                :key="item"
                :drag-key="item"
              >
                <div class="h-full bg-white flex justify-center items-center">
                  Item {{ item }}
                </div>
              </item>
            </transition-group>
          </draggable>
        </div>
      </template>
    </card>
  </Section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Section } from './marketing/sharedComponents'
import Card from './marketing/Card.vue'
import Draggable from './drag-n-drop/Draggable.vue'
import Item from './drag-n-drop/Item.vue'
import { highlightAuto } from 'highlight.js'

const vHoldCode = `
<div>
  <v-circle v-hold="count" />
  <v-circle v-hold:[100]="count" />
</div>
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
      vHoldCode: highlightAuto(vHoldCode).value,
      list: ref(Array.from({ length: 9 }, (e, i) => i.toString()))
    }
  }
})
</script>

<style scoped>
.cells-move {
  transition: transform 0.2s;
} 
</style>