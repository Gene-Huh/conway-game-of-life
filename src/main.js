import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faStop,
  faUndo,
  faSquare,
  faStepForward,
  faStepBackward
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlay, faStop, faUndo, faSquare, faStepForward, faStepBackward);

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
