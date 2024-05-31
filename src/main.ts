import "./assets/scss/global.scss";

import vClickOutside from "click-outside-vue3";
import mitt from "mitt";
import { createPinia } from "pinia";
import { createApp } from "vue";
import vueRouter from "vue-router";

import App from "./App.vue";
const emitter = mitt();
const app = createApp(App);

app.config.globalProperties.eventBus = emitter;
app.use(vueRouter);
app.use(createPinia());
app.use(vClickOutside);
app.mount("#app");
