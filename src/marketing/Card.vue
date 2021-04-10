<template>
  <div class="bg-white rounded-lg shadow-lg p-4">
    <div class="pb-4">
      <slot name="title" />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <slot name="left" />
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
</script>
