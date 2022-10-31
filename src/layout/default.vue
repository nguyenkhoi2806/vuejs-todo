<script>
import Loading from "@/components/Loading/Loading.vue";
export default {
  name: "Layout",
  components: {
    Loading,
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
  <slot name="slide-bar" :on-close="handleSlideBar" :open="open"></slot>
  <slot name="header" :open-slide="handleSlideBar"></slot>
  <Suspense>
    <template #default>
      <slot name="body"></slot>
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
