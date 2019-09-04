<template>
  <button
    class="absolute w-8 h-8 top-0 left-0 mt-min ml-min flex justify-center items-center rounded-full shadow-md hover:shadow-lg drag-none text-blue-700 hover:text-blue-600 active:text-blue-500 transition"
  >
    <vue-svg-gauge
      :start-angle="0"
      :end-angle="360"
      :min="0"
      :max="1"
      :value="value ? 1 : 0.0001"
      gauge-color="currentColor"
      base-color="#BEE3F8"
      :scale-interval="0"
      :separator-step="0"
      :inner-radius="0"
      easing="Linear.None"
      :transition-duration="duration"
    />
    <div
      class="absolute inset-0 flex justify-center items-center text-white"
      @click="knock"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <i class="fas fa-bullhorn opacity-75" />
    </div>
  </button>
</template>

<script>
export default {
  name: "Knocker",
  data() {
    return {
      value: true,
      timeout: null,
      hovering: false
    };
  },
  computed: {
    duration() {
      if (this.timeout) {
        return 4000;
      } else {
        return 100;
      }
    }
  },
  methods: {
    knock() {
      if (this.value) {
        this.timeout = setTimeout(() => {
          this.endKnock();
        }, 4000);
        this.value = false;
        this.$emit("knock");
      }
    },
    endKnock() {
      clearTimeout(this.timeout);
      this.timeout = null;
      this.value = true;
    }
  }
};
</script>