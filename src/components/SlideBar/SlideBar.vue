<script>
import { storeToRefs } from "pinia";

import { useThemeStore } from "../../stores/theme";

export default {
  name: "SlideBar",
  props: {
    open: {
      type: Boolean,
      default() {
        return false;
      },
    },
    onClose: {
      type: Function,
      default() {
        return false;
      },
    },
  },
  setup() {
    const store = useThemeStore();
    const { showProgress } = storeToRefs(store);

    return {
      store,
      showProgress,
    };
  },
  methods: {
    handleShowProgress() {
      const { store } = this;
      store.updateShowProgress();
    },
  },
};
</script>

<template>
  <div v-if="open" class="z-10 fixed inset-0 transition-opacity">
    <div tabindex="0" class="absolute inset-0 bg-black opacity-50"></div>
  </div>
  <aside
    class="transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="justify-between flex border-b">
      <div class="flex items-center py-3">
        <div class="shrink-0">
          <img
            src="https://visualpharm.com/assets/699/More%20Info-595b40b65ba036ed117d36d4.svg"
            class="rounded-full w-10"
            alt="Avatar"
          />
        </div>
        <div class="grow ml-3">
          <p class="text-sm font-semibold">Hello</p>
        </div>
      </div>
      <button class="items-center p-4 text-red" @click="onClose">
        <span>X</span>
      </button>
    </div>
    <div class="mt-5">
      <div class="flex justify-center mb-3">
        <div class="form-check form-switch">
          <input
            id="show-Progress"
            class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
            type="checkbox"
            role="switch"
            :checked="showProgress"
            @change="handleShowProgress"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="show-Progress"
          >
            Show Progress
          </label>
        </div>
      </div>
    </div>
  </aside>
</template>
