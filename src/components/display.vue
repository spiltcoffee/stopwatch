<template>
  <div
    class="m-2 mb-0 relative"
    :class="playing ? 'text-green-600' : 'text-blue-600'"
  >
    <div class="text-4xl w-full text-center transition">
      <i class="fas fa-stopwatch" />
    </div>
    <div class="inset-0 absolute flex justify-center">
      <div
        class="text-4xl bg-white"
        :class="[
          value >= 30 ? 'opacity-0 hover:opacity-75' : 'text-red-700',
          disableTransition || 'transition',
        ]"
      >
        {{ time }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Display",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    playing: Boolean,
    disableTransition: Boolean,
  },
  computed: {
    time() {
      return moment().minutes(0).seconds(this.value).format("mm:ss");
    },
  },
};
</script>
