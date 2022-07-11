<script>
import HeaderApp from "../components/Header/Header.vue";
import SlideBar from "../components/SlideBar/SlideBar.vue";

export default {
  name: "Layout",
  components: {
    HeaderApp,
    SlideBar,
  },
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
  <SlideBar :on-close="handleSlideBar" :open="open" />
  <HeaderApp :open-slide="handleSlideBar" />
  <slot />
</template>
