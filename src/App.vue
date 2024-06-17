<script>
import Layout from "@/components/Layout.vue";

export default {
  name: "App",
  components: { Layout },
};
</script>

<template>
  <router-view v-slot="{ Component }">
    <Layout :component="Component" />
  </router-view>
</template>
