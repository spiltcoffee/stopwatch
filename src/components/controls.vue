<template>
  <div class="flex">
    <button
      v-if="!playing"
      class="m-2 w-6 h-6 rounded text-white text-center shadow-md transition"
      :class="playable ? 'bg-green-700 hover:bg-green-600 active:bg-green-500 hover:shadow-lg' : 'bg-gray-300'"
      @click="$emit('play')"
      :disabled="!playable"
    >
      <i class="fas fa-play opacity-75" />
    </button>
    <button
      v-else
      class="m-2 w-6 h-6 rounded bg-blue-700 hover:bg-blue-600 active:bg-blue-500 text-white text-center shadow-md hover:shadow-lg transition"
      @click="$emit('pause')"
    >
      <i class="fas fa-pause opacity-75" />
    </button>
    <button
      class="m-2 w-6 h-6 rounded text-white text-center shadow-md transition"
      :class="stoppable ? 'bg-red-700 hover:bg-red-600 active:bg-red-500 hover:shadow-lg' : 'bg-gray-300'"
      @click="$emit('stop')"
      :disabled="!stoppable"
    >
      <i class="fas fa-stop opacity-75" />
    </button>
  </div>
</template>

<script>
export default {
  name: "Controls",
  props: {
    playing: Boolean,
    playable: Boolean,
    stoppable: Boolean
  }
};
</script>