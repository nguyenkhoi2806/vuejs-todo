import vClickOutside from "click-outside-vue3";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.use(vClickOutside);
app.mount("#app");
