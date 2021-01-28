import App from "./app.vue";
import Adder from "./adder.vue";
import Controls from "./controls.vue";
import Display from "./display.vue";
import Knocker from "./knocker.vue";
import Settings from "./settings.vue";
import Toolbar from "./toolbar.vue";

export default {
  install(Vue) {
    Vue.component(App.name, App);
    Vue.component(Adder.name, Adder);
    Vue.component(Controls.name, Controls);
    Vue.component(Display.name, Display);
    Vue.component(Knocker.name, Knocker);
    Vue.component(Settings.name, Settings);
    Vue.component(Toolbar.name, Toolbar);
  },
};
