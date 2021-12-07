<template>
  <div
    v-if="showing"
    class="
      absolute
      m-5
      inset-0
      bg-white
      rounded-full
      flex
      justify-center
      items-center
      text-gray-900
    "
  >
    <div class="drag-none flex flex-col">
      <div class="font-bold text-center">Settings</div>
      <label class="flex flex-col py-1">
        <div class="text-xs">Default Timer (seconds)</div>
        <input
          v-model.number="max"
          class="rounded border p-1"
          type="text"
          size="0"
        />
      </label>
      <button
        class="p-1 bg-white text-left"
        @click="alwaysOnTop = !alwaysOnTop"
      >
        <i
          :class="
            alwaysOnTop ? 'fa fa-check-square text-blue-600' : 'far fa-square'
          "
        />
        Always On Top
      </button>
      <button
        class="p-1 bg-white text-left"
        @click="openAtLogin = !openAtLogin"
      >
        <i
          :class="
            openAtLogin ? 'fa fa-check-square text-blue-600' : 'far fa-square'
          "
        />
        <span class="flex-1">Open At Login</span>
      </button>
      <button class="p-1 bg-white text-left" @click="autoKnock = !autoKnock">
        <i
          :class="
            autoKnock ? 'fa fa-check-square text-blue-600' : 'far fa-square'
          "
        />
        Auto Knock
      </button>
      <div class="flex">
        <button
          class="
            flex-1
            block
            mr-1
            hover:bg-gray-100
            active:bg-gray-200
            p-1
            font-bold
            rounded
            hover:shadow-md
            transition
          "
          @click="hide"
        >
          Cancel
        </button>
        <button
          class="
            flex-1
            block
            ml-1
            bg-blue-700
            hover:bg-blue-600
            active:bg-blue-500
            p-1
            text-white
            font-bold
            rounded
            shadow-md
            hover:shadow-lg
            transition
          "
          @click="applySettings"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      showing: false,
      settings: null,
    };
  },
  computed: {
    max: {
      get() {
        return this.settings.max;
      },
      set(max) {
        this.settings.max = max;
      },
    },
    alwaysOnTop: {
      get() {
        return this.settings.alwaysOnTop;
      },
      set(alwaysOnTop) {
        this.settings.alwaysOnTop = alwaysOnTop;
      },
    },
    openAtLogin: {
      get() {
        return this.settings.openAtLogin;
      },
      set(openAtLogin) {
        this.settings.openAtLogin = openAtLogin;
      },
    },
    autoKnock: {
      get() {
        return this.settings.autoKnock;
      },
      set(autoKnock) {
        this.settings.autoKnock = autoKnock;
      },
    },
  },
  methods: {
    show(currentSettings) {
      this.settings = { ...currentSettings };
      this.showing = true;
    },
    applySettings() {
      this.$emit("apply", this.settings);
      this.hide();
    },
    hide() {
      this.showing = false;
      this.settings = null;
    },
  },
};
</script>
