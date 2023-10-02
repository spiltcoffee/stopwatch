<template>
  <div class="relative drag-none w-contain">
    <div class="z-0 absolute inset-0 m-1 bg-white rounded-full clip-padding" />
    <vue-svg-gauge
      :start-angle="0"
      :end-angle="360"
      :min="0"
      :max="currentMax"
      :value="value"
      gauge-color="currentColor"
      :scale-interval="0"
      :separator-step="0"
      :inner-radius="90"
      :transition-duration="0"
      easing="Linear.None"
      class="gauge relative z-10 drag"
      :class="[
        value >= 30 ? 'text-pax-aus' : 'text-red-700',
        disableTransition || 'transition',
      ]"
    >
      <div class="w-full h-full flex justify-center items-center">
        <div class="flex flex-col justify-center items-center drag-none">
          <time-display
            :value="value"
            :playing="playing"
            :disable-transition="disableTransition"
          />

          <div
            class="hover:opacity-100 opacity-50 transition flex flex-col justify-center items-center"
          >
            <value-control @add="add" @remove="remove" />
            <time-control
              :playing="playing"
              :playable="playable"
              :stoppable="stoppable"
              @play="play"
              @pause="pause"
              @stop="stop"
            />
          </div>
        </div>
        <knock-control ref="knockControl" />
      </div>
    </vue-svg-gauge>
    <stopwatch-settings
      v-if="showSettings"
      ref="stopwatchSettings"
      class="z-10"
      @apply="applySettings"
    />
    <stopwatch-toolbar
      v-if="showToolbar"
      @settings="showSettings"
      @minimize="minimize"
      @close="close"
    />
  </div>
</template>

<script lang="ts">
import { ipcRenderer } from "electron";
import { WEB } from "../utils/flags";
import { SettingsInterface } from "../utils/settings";
import { defineComponent } from "vue";
import VueSvgGauge from "../vue-svg-gauge/VueSvgGauge.vue";
import TimeDisplay from "./TimeDisplay.vue";
import ValueControl from "./ValueControl.vue";
import TimeControl from "./TimeControl.vue";
import KnockControl from "./KnockControl.vue";
import StopwatchSettings from "./StopwatchSettings.vue";
import StopwatchToolbar from "./StopwatchToolbar.vue";

const INCREMENT = 60;

export default defineComponent({
  name: "App",
  components: {
    VueSvgGauge,
    TimeDisplay,
    ValueControl,
    TimeControl,
    KnockControl,
    StopwatchSettings,
    StopwatchToolbar,
  },
  data() {
    return {
      autoKnock: false,
      max: 0,
      currentMax: 0,
      value: 0,
      interval: null,
      disableTransition: false,
      showToolbar: !WEB,
    };
  },
  computed: {
    playing() {
      return !!this.interval;
    },
    playable() {
      return !this.interval && this.value > 0;
    },
    stoppable() {
      return (
        !this.interval &&
        (this.currentMax !== this.max || this.value !== this.max)
      );
    },
  },
  created() {
    this.load();
  },
  methods: {
    play() {
      if (this.value > 0) {
        this.interval = setInterval(() => {
          if (this.value > 0) {
            this.value--;
          }

          if (this.value <= 0) {
            this.pause();
            this.logSession("normal");
            if (this.autoKnock) {
              (<typeof KnockControl>this.$refs.knockControl).knock();
            }
          }
        }, 1000);
      }
    },
    stop() {
      if (this.value > 0) {
        this.logSession("stopped");
      }
      this.disableTransition = true;
      this.value = this.max;
      this.currentMax = this.max;
      setTimeout(() => {
        this.disableTransition = false;
      }, 25);
    },
    pause() {
      clearInterval(this.interval);
      this.interval = null;
    },
    add() {
      this.value += INCREMENT;
      if (this.value > this.currentMax) {
        this.currentMax = this.value;
      }
    },
    remove() {
      this.value -= INCREMENT;
      if (this.value < 0) {
        this.pause();
        this.value = 0;
        this.logSession("removed-time");
      }
      if (this.currentMax > this.max) {
        this.currentMax -= INCREMENT;
        if (this.currentMax < this.max) {
          this.currentMax = this.max;
        }
      }
    },
    minimize() {
      ipcRenderer.send("minimize");
    },
    close() {
      ipcRenderer.send("close");
    },
    load() {
      const settings = ipcRenderer.sendSync("load-settings");
      this.max = settings.max;
      this.autoKnock = settings.autoKnock;
      this.stop();
    },
    save() {
      // do nothing?? huh??
    },
    logSession(type: string) {
      ipcRenderer.send("finished", {
        type,
        value: this.value,
        max: this.currentMax,
      });
    },
    showSettings() {
      const settings = ipcRenderer.sendSync("load-settings");
      (<typeof StopwatchSettings>this.$refs.stopwatchSettings).show(settings);
    },
    applySettings(settings: SettingsInterface) {
      ipcRenderer.send("save-settings", {
        ...ipcRenderer.sendSync("load-settings"),
        ...settings,
      });
      this.load();
    },
  },
});
</script>

<style>
@import "~@fortawesome/fontawesome-free/css/all.css";
@tailwind base;
@tailwind utilities;

.transition {
  transition: all 0.25s ease;
}

.clip-padding {
  background-clip: padding-box;
}

.drag {
  -webkit-app-region: drag;
}

.drag-none {
  -webkit-app-region: no-drag;
}
</style>
