<template>
  <router-view v-slot="{ Component }">
    <Layout :component="Component" />
  </router-view>
</template>

<script>
import Layout from "@/layout/default.vue";

export default {
  name: "App",
  components: { Layout },
};
</script>
