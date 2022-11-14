<script>
import { defineAsyncComponent } from "vue";

import About from "@/views/About/About.vue";
import NotFound from "@/views/NotFound/NotFound.vue";

const routes = {
  "/": defineAsyncComponent(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(import("@/views/Dashboard/Dashboard.vue"));
        }, 1000);
      })
  ),
  "/about": About,
};

export default {
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  computed: {
    currentView() {
      if (!this.currentPath) {
        return routes[window.location.pathname] || NotFound;
      }

      return routes[this.currentPath.slice(1) || "/"] || NotFound;
    },
  },
  mounted() {
    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.pathname;
    });
  },
};
</script>

<template>
  <component :is="currentView" />
</template>
