<script>
import SlideBar from "./SlideBar/SlideBar.vue";
import HeaderApp from "./Header/Header.vue";
import Loading from "@/components/Loading/Loading.vue";

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
    component: {
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
        <component :is="component" :key="$route.path"></component>
      </template>
      <template #fallback>
        <Loading />
      </template>
    </suspense>
  </div>
</template>
