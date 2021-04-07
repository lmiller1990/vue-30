<template>
  <!-- <v-hold-app /> -->
  <tab-container v-model="activeTabId">
    <tab tabId="1">Tab 1</tab>
    <tab tabId="2">Tab 2</tab>
    <tab-content tabId="1">Content #1</tab-content>
    <tab-content tabId="2">Content #2</tab-content>
  </tab-container>
  {{ activeTabId }}
</template>

<script lang="ts">
import VHoldApp from './v-hold-directive/App.vue'
import {
  TabContainer,
  TabContent,
  Tab
} from './shared/tabs'
import { ref, watchEffect } from 'vue'

export default {
  setup() {
    const activeTabId = ref('1')
    watchEffect(() => {
      console.log(activeTabId.value)
    })

    return {
      activeTabId
    }
  },

  components: {
    TabContainer,
    TabContent,
    Tab,
    VHoldApp,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>