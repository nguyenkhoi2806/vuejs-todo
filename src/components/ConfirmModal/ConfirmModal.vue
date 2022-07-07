<script>
export default {
  name: "ConfirmModal",
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    body: {
      type: (v) => true,
      default() {
        return null;
      },
    },
    confirmText: {
      type: String,
      default() {
        return "Save changes";
      },
    },
    onConfirm: {
      type: Function,
      default() {
        return null;
      },
    },
    onClose: {
      type: Function,
      default() {
        return null;
      },
    },
    width: {
      type: String,
      default: "full",
      validator: (value) =>
        ["xs", "sm", "md", "lg", "full"].indexOf(value) !== -1,
    },
  },
  computed: {
    maxWidth() {
      switch (this.width) {
        case "xs":
          return "max-w-lg";
        case "sm":
          return "max-w-xl";
        case "md":
          return "max-w-2xl";
        case "lg":
          return "max-w-3xl";
        case "full":
          return "max-w-full";
        default:
          return "max-w-full";
      }
    },
  },
};
</script>

<template>
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-10"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50"
      @click="onClose"
    ></div>
    <div class="absolute max-h-full max-w-xl w-full" :class="maxWidth">
      <div class="container bg-white overflow-hidden md:rounded">
        <div class="px-4 py-4 w-full">
          <div class="max-h-full">
            <div class="items-center mb-2">
              <h3 class="font-semibold">{{ title }}</h3>
              <div>
                {{ body }}
              </div>
              <div class="text-right mt-4">
                <button
                  class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline"
                  @click="onClose"
                >
                  Cancel
                </button>
                <button
                  class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400"
                  @click="onConfirm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
