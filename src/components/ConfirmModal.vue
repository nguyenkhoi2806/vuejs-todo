<script>
import Modal from "../Modal/Modal.vue";

export default {
  name: "ConfirmModal",
  components: {
    Modal,
  },
  props: {
    width: {
      type: String,
      default() {
        return "sm";
      },
    },
    title: {
      type: String,
      default() {
        return "";
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
  },
};
</script>

<template>
  <Modal :title="title" :width="width" :on-close="onClose">
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
        {{ confirmText ? confirmText : "Save changes " }}
      </button>
    </div>
  </Modal>
</template>
