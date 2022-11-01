<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue-demi";

import useSettingStore from "@/stores/setting";

export default defineComponent({
  name: "Button",
  props: {
    click: {
      type: Function,
      default() {
        return;
      },
    },
    label: {
      type: String,
      default() {
        return "button";
      },
    },
  },
  setup() {
    const settingStore = useSettingStore();
    const { themeSelected } = storeToRefs(settingStore);
    return {
      themeSelected,
    };
  },
});
</script>

<template>
  <button
    class="font-bold px-2 py-2 rounded w-1/12"
    :class="[
      'bg-' + themeSelected.backgroundColor,
      'text-' + themeSelected.textColor,
      'hover:bg' + themeSelected.textColor + '-700',
    ]"
    @click="click"
  >
    {{ label }}
  </button>
</template>
