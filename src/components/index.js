import App from "./app";
import Adder from "./adder";
import Controls from "./controls";
import Display from "./display";
import Knocker from "./knocker";
import Toolbar from "./toolbar";

export default {
  install(Vue) {
    Vue.component(App.name, App);
    Vue.component(Adder.name, Adder);
    Vue.component(Controls.name, Controls);
    Vue.component(Display.name, Display);
    Vue.component(Knocker.name, Knocker);
    Vue.component(Toolbar.name, Toolbar);
  }
};
