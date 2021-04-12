<template>
  <Section>
    <card> 
      <template v-slot:title>
        <h1 class="text-3xl">Custom <code>v-hold</code> directive</h1>
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
        <div>
          <div class="flex flex-col items-center">
            <div class="flex">
              <v-circle :size="120" :interval="10" bg="green"/>
              <v-circle :size="120" :interval="100" bg="red" />
            </div>
          </div>
        </div>
      </template>
    </card>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Section } from './marketing/sharedComponents'
import Card from './marketing/Card.vue'
import VCircle from './v-hold-directive/v-circle.vue'
import { highlightAuto } from 'highlight.js'

const vHoldCode = `
<div>
  <v-circle v-hold="count" />
  <v-circle v-hold:[100]="count" />
</div>
`.trim()


export default defineComponent({
  components: {
    Section,
    Card,
    VCircle,
  },

  setup() {
    return {
      vHoldCode: highlightAuto(vHoldCode).value,
    }
  }
})
</script>