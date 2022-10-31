<script>
import "tw-elements";

import { defineAsyncComponent } from "vue";

import HeaderApp from "@/components/Header/Header.vue";
import SlideBar from "@/components/SlideBar/SlideBar.vue";

import Layout from "./layout/default.vue";

export default {
  components: {
    Todo: defineAsyncComponent({
      loader: () => import("@/views/Todo/Todo.vue"),
      delay: 10000,
      timeout: 10000,
    }),
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
        <Todo />
      </div>
    </template>
  </Layout>
</template>
