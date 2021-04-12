<template>
  <Section>
    <card> 
      <template v-slot:title>
        <h1 class="text-3xl">Animations and Transitions</h1>
      </template>

      <template v-slot:left>
        <div class="flex flex-col justify-center">
          <p>
            <div class="p-4 bg-gray-800 text-white whitespace-pre-wrap text-left rounded-lg">
              <div class="code" v-html="code" />
            </div>
          </p>
        </div>
      </template>

      <template v-slot:right>
        <transition-app />
      </template>

    </card>
  </Section>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TransitionApp from './transitions/App.vue'
import { Section } from './marketing/sharedComponents'
import Card from './marketing/Card.vue'
import { highlightAuto } from 'highlight.js'

const code = `
<transition-group as="div">
  <cell v-for="cell in cells">
    {{ cell }}
  </cell>
</transition-group>`.trim()



export default defineComponent({
  components: {
    Section,
    Card,
    TransitionApp,
  },

  setup() {
    return {
      code: highlightAuto(code).value,
    }
  }
})
</script>

<style scoped>
.cells-move {
  transition: transform 0.2s;
} 
</style>