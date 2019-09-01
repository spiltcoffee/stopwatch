<template>
  <div class="flex">
    <div
      v-if="!playing"
      class="m-2 w-6 h-6 rounded text-white text-center shadow-md transition"
      :class="!stoppable ? 'bg-green-700 hover:bg-green-600 hover:shadow-lg' : 'bg-gray-300'"
      @click="!stoppable && $emit('play')"
    >
      <i class="fas fa-play opacity-75" />
    </div>
    <div
      v-else
      class="m-2 w-6 h-6 rounded bg-blue-700 hover:bg-blue-600 text-white text-center shadow-md hover:shadow-lg transition"
      @click="$emit('pause')"
    >
      <i class="fas fa-pause opacity-75" />
    </div>
    <div
      class="m-2 w-6 h-6 rounded text-white text-center shadow-md transition"
      :class="stoppable ? 'bg-red-700 hover:bg-red-600 hover:shadow-lg' : 'bg-gray-300'"
      @click="stoppable && $emit('stop')"
    >
      <i class="fas fa-stop opacity-75" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playing: Boolean,
    stoppable: Boolean
  }
};
</script>