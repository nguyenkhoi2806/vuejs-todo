<script>
import { useRouter } from "vue-router";

import Product from "@/models/product";

export default {
  name: "ProductCard",
  props: {
    product: Product,
  },
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
  methods: {
    goToProductDetails() {
      this.router.push({ name: "product", params: { id: this.product.id } });
    },
  },
};
</script>

<template>
  <div
    class="h-full flex justify-center items-center pt-5 cursor-pointer"
    :onclick="goToProductDetails"
  >
    <img
      :src="product.image"
      alt="img-blur-shadow"
      layout="fill"
      class="w-1/3"
    />
  </div>
  <div class="p-6">
    <h5
      class="mb-2 block font-sans text-md font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"
    >
      {{ product.title }}
    </h5>
    <p
      class="x font-sans text-base font-light leading-relaxed flex justify-between"
    >
      {{ product.category }}
      <button
        class="rounded-full border p-2 flex items-center cursor-pointer hover:border-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </button>
    </p>
  </div>
</template>
