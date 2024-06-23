<script>
import { defineComponent } from "vue-demi";

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
        return "";
      },
    },
  },
});
</script>

<template>
  <button
    class="font-bold px-2 py-2 rounded w-full border hover:border-black disabled:cursor-not-allowed"
    @click="click">
    {{ label }}
    <slot></slot>
  </button>
</template>
