<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "Shopping",
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      return fetch("https://fakestoreapi.com/products/?limit=9")
        .then(async (result) => {
          const data = await result.json();
          this.products = data;
        })
        .catch((err) => {
          this.error = err.toString();
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">
        My Products
      </h2>
      <div
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="group relative"
        >
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>
