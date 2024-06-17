import "./assets/scss/global.scss";

import vClickOutside from "click-outside-vue3";
import mitt from "mitt";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

const emitter = mitt();
const app = createApp(App).use(createPinia()).use(vClickOutside).use(router);

app.config.globalProperties.eventBus = emitter;

app.mount("#app");
