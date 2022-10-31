<script>
export default {
  name: "Layout",
  data() {
    return {
      open: false,
    };
  },
  methods: {
    handleSlideBar() {
      this.open = !this.open;
    },
  },
};
</script>

<template>
  <slot name="slide-bar" :on-close="handleSlideBar" :open="open"></slot>
  <slot name="header" :open-slide="handleSlideBar"></slot>
  <slot name="body"></slot>
</template>
