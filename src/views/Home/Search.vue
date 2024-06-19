<script>
export default {
  name: "Search",
  components: {},
  data: function () {
    return {
      categories: [],
      categorySelected: "All",
    };
  },
  created() {
    this.fetchCategory();
  },
  methods: {
    selectCategory(category) {
      this.categorySelected = category;
    },
    async fetchCategory() {
      return fetch("https://fakestoreapi.com/products/categories").then(
        async (result) => {
          const data = await result.json();
          this.categories = ["All"].concat(data);
        },
      );
    },
  },
};
</script>
<template>
  <div class="flex">
    <button
      v-for="category in categories"
      :key="category"
      type="button"
      class="mr-2 border text-black p-3 rounded leading-none flex items-center"
      :value="category"
      :class="{ 'border-gray-400': categorySelected === category }"
      @click="selectCategory(category)">
      {{ category }}
    </button>
  </div>
</template>
