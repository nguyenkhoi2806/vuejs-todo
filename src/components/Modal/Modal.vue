<script>
export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    onClose: {
      type: Function,
      default() {
        return null;
      },
    },
    width: {
      type: String,
      default: "full",
      validator: (value) =>
        ["xs", "sm", "md", "lg", "full"].indexOf(value) !== -1,
    },
  },
  computed: {
    maxWidth() {
      switch (this.width) {
        case "xs":
          return "max-w-lg";
        case "sm":
          return "max-w-xl";
        case "md":
          return "max-w-2xl";
        case "lg":
          return "max-w-3xl";
        case "full":
          return "max-w-full";
        default:
          return "max-w-full";
      }
    },
  },
};
</script>

<template>
  <teleport to="#modal">
    <div
      class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-10"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50"
        @click="onClose"
      ></div>
      <div class="absolute max-h-full max-w-xl w-full" :class="maxWidth">
        <div class="container bg-white overflow-hidden md:rounded">
          <div class="px-4 py-4 w-full">
            <div class="max-h-full">
              <div class="items-center mb-2">
                <h3>{{ title }}</h3>
              </div>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
