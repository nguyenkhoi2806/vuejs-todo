<script>
import "./assets/scss/global.scss";
import "tw-elements";

import Layout from "./layout/default.vue";
import Todo from "./views/Todo/Todo.vue";

export default {
  components: {
    Todo,
    Layout,
  },
};
</script>

<template>
  <Layout>
    <slot>
      <div class="container mx-auto">
        <Todo />
      </div>
    </slot>
  </Layout>
</template>
