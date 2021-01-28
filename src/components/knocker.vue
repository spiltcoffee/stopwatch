<template>
  <button
    class="absolute w-8 h-8 top-0 left-0 mt-min ml-min rounded-full shadow-md hover:shadow-lg drag-none text-blue-700 hover:text-blue-600 active:text-blue-500 transition flex justify-center items-center"
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
      :transition-duration="displayDuration"
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
const knockSound = new Audio(require("../knock.wav"));

export default {
  name: "Knocker",
  data() {
    return {
      value: true,
      timeout: null,
      hovering: false,
    };
  },
  computed: {
    knockDuration() {
      return knockSound.duration
        ? Math.round(knockSound.duration * 1000)
        : 4000;
    },
    displayDuration() {
      if (this.timeout) {
        return this.knockDuration;
      } else {
        return 0;
      }
    },
  },
  methods: {
    knock() {
      if (!this.value) {
        this.endKnock();
      }

      this.$nextTick(() => {
        this.timeout = setTimeout(() => {
          this.endKnock();
        }, this.knockDuration);
        this.value = false;
        knockSound.play();
        this.$emit("knock");
      });
    },
    endKnock() {
      clearTimeout(this.timeout);
      this.timeout = null;
      this.value = true;
      knockSound.pause();
      knockSound.currentTime = 0;
    },
  },
};
</script>
