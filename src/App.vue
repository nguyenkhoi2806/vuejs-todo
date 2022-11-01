<script>
import "tw-elements";

import { defineAsyncComponent } from "vue";

import HeaderApp from "@/components/Header/Header.vue";
import SlideBar from "@/components/SlideBar/SlideBar.vue";

import Layout from "./layout/default.vue";

export default {
  components: {
    Dashboard: defineAsyncComponent(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(import("@/views/Dashboard/Dashboard.vue"));
          }, 2000);
        })
    ),
    Layout,
    SlideBar,
    HeaderApp,
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
        <Dashboard />
      </div>
    </template>
  </Layout>
</template>
