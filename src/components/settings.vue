<template>
  <div
    v-if="showing"
    class="absolute m-5 inset-0 bg-white rounded-full flex justify-center items-center text-gray-900"
  >
    <div>
      <div>Settings</div>
      <label class="flex flex-col p-1">
        <div class="text-xs">Default Timer (seconds)</div>
        <input class="rounded border" type="text" size="0" v-model.number="max" />
      </label>
      <label>
        <div class="text-xs">Default Timer (seconds)</div>
      </label>
      <div>
        <button @click="hide">Cancel</button>
        <button @click="applySettings">Apply</button>
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
      settings: null
    };
  },
  computed: {
    max: {
      get() {
        return this.settings.max;
      },
      set(max) {
        this.settings.max = max;
      }
    },
    alwaysOnTop: {
      get() {
        return this.settings.alwaysOnTop;
      },
      set(alwaysOnTop) {
        this.settings.alwaysOnTop = alwaysOnTop;
      }
    },
    openAtLogin: {
      get() {
        return this.settings.openAtLogin;
      },
      set(openAtLogin) {
        this.settings.openAtLogin = openAtLogin;
      }
    },
    autoKnock: {
      get() {
        return this.settings.autoKnock;
      },
      set(autoKnock) {
        this.settings.autoKnock = autoKnock;
      }
    }
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
    }
  }
};
</script>