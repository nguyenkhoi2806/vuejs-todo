<script>
import "tw-elements";

import HeaderApp from "@/components/Header/Header.vue";
import SlideBar from "@/components/SlideBar/SlideBar.vue";
import Routing from "@/Routing/Routing.vue";

import Layout from "./layout/default.vue";

export default {
  components: {
    Layout,
    SlideBar,
    HeaderApp,
    Routing,
  },
};
</script>

<template>
  <Layout>
    <template #slide-bar="{ onClose, open }">
      <SlideBar :on-close="onClose" :open="open" />
    </template>
    <template #header="{ openSlide }">
      <HeaderApp :open-slide="openSlide" />
    </template>
    <template #body>
      <div class="container mx-auto">
        <Routing />
      </div>
    </template>
  </Layout>
</template>
