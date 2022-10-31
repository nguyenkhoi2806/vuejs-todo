<script>
import "tw-elements";

import HeaderApp from "@/components/Header/Header.vue";
import SlideBar from "@/components/SlideBar/SlideBar.vue";

import Layout from "./layout/default.vue";
import Todo from "./views/Todo/Todo.vue";

export default {
  components: {
    Todo,
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
