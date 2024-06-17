<script>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import {
  ROUTE_ABOUT_US,
  ROUTE_DASHBOARD,
  ROUTE_SHOPPING_CART,
} from "@/constants/route";
import useSettingStore from "@/stores/setting";

export default {
  name: "Header",
  props: {
    openSlide: {
      type: Function,
      default() {
        return false;
      },
    },
  },

  setup() {
    const store = useSettingStore();
    const { themeSelected } = storeToRefs(store);
    const route = useRoute();
    return {
      route,
      themeSelected,
    };
  },
  data() {
    return {
      ROUTE_ABOUT_US,
      ROUTE_DASHBOARD,
      ROUTE_SHOPPING_CART,
    };
  },
  computed: {
    path() {
      return this.route.path;
    },
  },
};
</script>

<template>
  <div
    class="flex header justify-start px-4 py-4 gap-3"
    :class="'bg-' + themeSelected.backgroundColor"
  >
    <div class="flex justify-start">
      <div class="flex text-center" @click="openSlide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8"
          viewBox="0 0 20 20"
          :fill="themeSelected.textColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
    <div
      class="w-11/12 flex text-center items-center text-xl"
      :class="'text-' + themeSelected.textColor"
    >
      <nav
        class="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light"
      >
        <div
          class="container-fluid w-full flex flex-wrap items-center justify-between px-6"
        >
          <div class="collapse navbar-collapse flex-grow items-center">
            <ul
              class="navbar-nav flex flex-col pl-0 list-style-none mr-auto text-black"
            >
              <li class="nav-item px-2">
                <RouterLink
                  class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
                  :class="path === ROUTE_DASHBOARD ? 'text-gray-900' : ''"
                  aria-current="page"
                  to="/"
                >
                  Dashboard
                </RouterLink>
              </li>
              <li class="nav-item pr-2">
                <RouterLink
                  class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
                  to="/shopping-cart"
                  :class="path === ROUTE_SHOPPING_CART ? 'text-gray-900' : ''"
                >
                  Shopping
                </RouterLink>
              </li>
              <li class="nav-item pr-2">
                <RouterLink
                  class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
                  to="/about"
                  :class="path === ROUTE_ABOUT_US ? 'text-gray-900' : ''"
                >
                  About
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
