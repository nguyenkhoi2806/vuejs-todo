<template>
  <div class="flex header justify-center bg-blue-500 px-4 py-4">
    <div class="justify-center w-1/12 flex text-center">
      <div class="flex text-center" @click="openSlide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
    <div class="w-11/12 flex text-center items-center text-xl text-white">
      <h1>Dashboard</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    openSlide: {
      type: Function,
      default() {
        return false;
      },
    },
  },
};
</script>
