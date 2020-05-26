import Vue from "vue";
import AppComponent from "./App/App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "../assets/css/common.scss";

Vue.component("app-component", AppComponent);


new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
