import Vue from "vue";
import VueSvgGauge from "vue-svg-gauge";
import Components from "./components";

Vue.use(VueSvgGauge);
Vue.use(Components);

new Vue({
  el: "#app"
});
