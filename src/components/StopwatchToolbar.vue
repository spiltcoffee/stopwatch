<template>
  <div class="z-10 absolute top-0 right-0 mt-min mr-min drag-none text-sm">
    <div class="flex opacity-0 hover:opacity-100 pb-4 pl-1 transition">
      <div
        class="px-2 py-1 text-gray-400 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 transition"
        @click="$emit('settings')"
      >
        <i class="fas fa-cog" />
      </div>
      <div
        class="px-2 py-1 text-gray-400 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 transition"
        @click="$emit('minimize')"
      >
        <i class="far fa-window-minimize" />
      </div>
      <div
        class="px-2 py-1 text-gray-400 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 transition"
        @click="$emit('close')"
      >
        <i class="far fa-window-close" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StopwatchToolbar",
  emits: ["settings", "minimize", "close"],
});
</script>
