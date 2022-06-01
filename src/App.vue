<template>
  <Header />
  <div class="container mx-auto">
    <Todo />
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Todo from "./views/Todo/index.vue";
export default {
  components: {
    Header,
    Todo,
  },
};
</script>
