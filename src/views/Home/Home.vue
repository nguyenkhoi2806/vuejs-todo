<script>
import Loading from "@/components/Loading/Loading.vue";
import Button from "@/components/Button/Button.vue";

import ProductCard from "./ProductCard.vue";

export default {
  name: "Home",
  components: {
    ProductCard,
    Loading,
    Button,
  },
  data() {
    return {
      products: [],
      loading: false,
      error: null,
      limit: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.limit += 12;
      return fetch(`https://fakestoreapi.com/products/?limit=${this.limit}`)
        .then(async (result) => {
          const data = await result.json();
          this.products = [...data];
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
  <h2 class="text-2xl font-bold tracking-tight text-gray-900">My Products</h2>
  <div
    class="mt-6 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-[30px]">
    <div
      v-for="product in products"
      :key="product.id"
      class="border-2 shadow-xl flex flex-col h-full rounded-xl text-gray-700">
      <ProductCard :product="product" />
    </div>
  </div>
  <div class="flex items-center justify-center w-full mt-10">
    <Loading v-if="loading" />
  </div>
  <div v-if="products.length > 0" class="flex justify-center w-full mt-10">
    <Button
      class="border rounded p-3 text-black hover:border-red-500"
      @click="fetchData">
      Show more
    </Button>
  </div>
</template>
