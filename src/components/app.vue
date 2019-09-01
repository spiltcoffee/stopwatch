<template>
  <div class="relative drag-none">
    <div class="z-0 absolute inset-0 m-1 bg-white rounded-full clip-padding"></div>
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
      class="gauge relative z-10 drag transition"
      :class="value >= 30 ? 'text-pax-aus' : 'text-red-700'"
    >
      <div class="w-full h-full flex justify-center items-center">
        <knocker refs="knocker"></knocker>
        <div class="flex flex-col justify-center items-center drag-none">
          <display :value="value" :playing="playing"></display>

          <div
            class="hover:opacity-100 opacity-50 transition flex flex-col justify-center items-center"
          >
            <adder @add="add" @remove="remove"></adder>
            <controls
              :playing="playing"
              :stoppable="stoppable"
              @play="play"
              @pause="pause"
              @stop="stop"
            ></controls>
          </div>
        </div>
      </div>
    </vue-svg-gauge>
    <toolbar @minimize="minimize" @close="close"></toolbar>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
import { VueSvgGauge } from "vue-svg-gauge";
import moment from "moment";

import Adder from "./adder";
import Controls from "./controls";
import Display from "./display";
import Knocker from "./knocker";
import Toolbar from "./toolbar";

const INCREMENT = 60;

export default {
  components: {
    VueSvgGauge,

    Adder,
    Controls,
    Display,
    Knocker,
    Toolbar
  },
  data() {
    return {
      autoKnock: false,
      max: 0,
      currentMax: 0,
      value: 0,
      interval: null
    };
  },
  created() {
    this.load();
  },
  methods: {
    play(value) {
      if (this.value > 0) {
        this.interval = setInterval(() => {
          if (this.value > 0) {
            this.value--;
          }

          if (this.value <= 0) {
            this.pause();
            this.logSession("normal");
            if (autoKnock) {
              this.$refs.knocker.knock(true);
            }
          }
        }, 1000);
      }
    },
    stop() {
      if (this.value > 0) {
        this.logSession("stopped");
      }
      this.value = this.max;
      this.currentMax = this.max;
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
        this.currentMax -= time;
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
      const settings = ipcRenderer.sendSync("load-settings");
      settings.max = this.max;
      settings.autoKnock = this.autoKnock;
      ipcRenderer.send("save-settings", settings);
    },
    logSession(type) {
      ipcRenderer.send("finished", {
        type,
        value: this.value,
        max: this.currentMax
      });
    }
  },
  computed: {
    playing() {
      return !!this.interval;
    },
    stoppable() {
      return !this.interval && this.value < this.currentMax;
    }
  }
};
</script>
