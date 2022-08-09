<script>
import "./slide-bar.scss";

import { storeToRefs } from "pinia";

import { THEME_DATA } from "../../constants/theme";
import { useSettingStore } from "../../stores/setting";

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
    const store = useSettingStore();
    const { showProgress } = storeToRefs(store);

    return {
      store,
      showProgress,
      themes: THEME_DATA,
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
        <div class="grow ml-3">
          <p class="text-sm font-semibold text-gray-800">Settings</p>
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
    <div class="mt-5">
      <div class="pl-4 mb-3 w-full pr-3">
        <label class="mb-3 mt-3 inline-block"> Themes </label>
        <div class="flex justify-between">
          <p
            v-for="(theme, index) in themes"
            :key="index"
            class="flex flex-col justify-center text-center theme rounded p-2 w-18"
          >
            <span
              class="w-5 rounded-full px-4 py-4 mb-3"
              :class="'bg-' + theme.backgroundColor"
            ></span>
            <span>
              {{ theme.name }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>
