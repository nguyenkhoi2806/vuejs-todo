<template>
  <HeaderApp />
  <div class="container mx-auto">
    <Todo />
  </div>
</template>

<script>
import "./assets/scss/global.scss";
import "tw-elements";

import HeaderApp from "./components/Header/Header.vue";
import Todo from "./views/Todo/Todo.vue";

export default {
  components: {
    HeaderApp,
    Todo,
  },
};
</script>
