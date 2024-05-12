<script>
import { defineAsyncComponent } from "vue";

import {
  ROUTE_ABOUT_US,
  ROUTE_DASHBOARD,
  ROUTE_SHOPPING_CART,
} from "@/constants/route";
import About from "@/views/About/About.vue"
import NotFound from "@/views/NotFound/NotFound.vue";

export default {
  data() {
    return {
      currentPath: window.location.hash,
      routes: {
        [ROUTE_DASHBOARD]: defineAsyncComponent(
          () =>
            new Promise((resolve, _) => {
              setTimeout(() => {
                resolve(import("@/views/Dashboard/Dashboard.vue"));
              }, 1000);
            }),
        ),
        [ROUTE_ABOUT_US]: About,
        [ROUTE_SHOPPING_CART]: defineAsyncComponent(
          () =>
            new Promise((resolve, _) => {
              setTimeout(() => {
                resolve(import("@/views/Shopping/Shopping.vue"));
              });
            }),
        ),
      },
    };
  },
  computed: {
    currentView() {
      const { routes, currentPath } = this;
      if (!currentPath) {
        return routes[window.location.pathname] || NotFound;
      }

      return routes[currentPath.slice(1) || "/"] || NotFound;
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
