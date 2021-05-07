<template>
  <div class="m-6 flex">
    <div class="flex flex-col">
      <div 
        v-for="item in items" 
        :key="item"
      >
        {{ item }}
      </div>

      <div class="flex">
        <div 
          v-for="node in nodes" 
          :key="node.id"
          class="w-8 h-8 flex items-center justify-center"
          :class="{ 'bg-blue-300': node.value === currentPage }"
          @click="changePage(node)"
        >
          {{ node.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue"
import { usePagination } from "./usePagination";

export default {
  setup() {
    const arr: string[] = [];
    for (let i = 0; i < 100; i++) {
      arr.push(`Item #${i}`);
    }

    const perPage = 5
    const { nodes, changePage, currentPage } = usePagination(arr, { perPage });

    const items = computed(() => {
      return arr.slice((currentPage.value - 1) * perPage, ((currentPage.value - 1) * perPage) + perPage)
    })

    return {
      items,
      nodes,
      changePage,
      currentPage,
    };
  },
};
</script>

<style></style>
