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
      return fetch("https://fakestoreapi.com/products/?limit=12")
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
  <div class="mt-10">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">My Products</h2>
    <div
      class="mt-6 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-[30px]"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="border-2 shadow-xl flex flex-col h-full rounded-xl text-gray-700"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>
