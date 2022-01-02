import App from "./app.vue";
import KnockControl from "./knockControl.vue";
import StopwatchSettings from "./stopwatchSettings.vue";
import StopwatchToolbar from "./stopwatchToolbar.vue";
import TimeControl from "./timeControl.vue";
import TimeDisplay from "./timeDisplay.vue";
import ValueControl from "./valueControl.vue";

export default {
  install(Vue) {
    Vue.component(App.name, App);
    Vue.component(KnockControl.name, KnockControl);
    Vue.component(StopwatchSettings.name, StopwatchSettings);
    Vue.component(StopwatchToolbar.name, StopwatchToolbar);
    Vue.component(TimeControl.name, TimeControl);
    Vue.component(TimeDisplay.name, TimeDisplay);
    Vue.component(ValueControl.name, ValueControl);
  },
};
