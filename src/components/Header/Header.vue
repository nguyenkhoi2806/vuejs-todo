<script>
import { storeToRefs } from "pinia";

import {
  ROUTE_ABOUT_US,
  ROUTE_DASHBOARD,
  ROUTE_SHOPPING_CART,
} from "@/constants/route";
import useSettingStore from "@/stores/setting";

export default {
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

    return {
      themeSelected,
    };
  },

  data() {
    return {
      route: window.location.pathname,
      ROUTE_ABOUT_US,
      ROUTE_DASHBOARD,
      ROUTE_SHOPPING_CART,
    };
  },
};
</script>

<template>
  <div
    class="flex header justify-center px-4 py-4"
    :class="'bg-' + themeSelected.backgroundColor"
  >
    <div class="justify-center w-1/12 flex text-center">
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
            <ul class="navbar-nav flex flex-col pl-0 list-style-none mr-auto text-black">
              <li class="nav-item px-2">
                <a
                  class="nav-link"
                  :class="route === ROUTE_DASHBOARD ? 'font-bold' : ''"
                  aria-current="page"
                  :href="ROUTE_DASHBOARD"
                >
                  Dashboard
                </a>
              </li>
              <li class="nav-item pr-2">
                <a
                  class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
                  :href="ROUTE_SHOPPING_CART"
                  :class="route === ROUTE_SHOPPING_CART ? 'font-bold' : ''"
                >
                  Shopping
                </a>
              </li>
              <li class="nav-item pr-2">
                <a
                  class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
                  :href="ROUTE_ABOUT_US"
                  :class="route === ROUTE_ABOUT_US ? 'font-bold' : ''"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
