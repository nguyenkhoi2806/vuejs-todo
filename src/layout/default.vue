<script>
import Loading from "./Loading/Loading.vue";
import SlideBar from "./SlideBar/SlideBar.vue";
import HeaderApp from "@/components/Header/Header.vue";

export default {
  name: "Layout",
  components: { Loading, SlideBar, HeaderApp },
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
  props: {
    Component: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div>
    <SlideBar :on-close="handleSlideBar" :open="open" />
    <HeaderApp :open-slide="handleSlideBar" />
    <suspense timeout="0">
      <template #default>
        <component :is="Component" :key="$route.path"></component>
      </template>
      <template #fallback>
        <Loading />
      </template>
    </suspense>
  </div>
</template>
