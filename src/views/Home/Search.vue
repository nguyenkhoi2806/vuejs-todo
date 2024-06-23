<script>
export default {
  name: "Search",
  data() {
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
      this.$emit("category-selected", category);
    },
    async fetchCategory() {
      try {
        const result = await fetch(
          "https://fakestoreapi.com/products/categories",
        );
        const data = await result.json();
        this.categories = ["All"].concat(data);
      } catch (err) {
        console.error(err);
      }
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
      :class="{ 'border-gray-400': categorySelected === category }"
      @click="selectCategory(category)">
      {{ category }}
    </button>
  </div>
</template>
