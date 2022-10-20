<script>
export default {
  name: "InputTextCustom",
  props: {
    value: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["submit", "update-value:value"],
};
</script>

<template>
  <input
    :value="value"
    :required="required"
    :class="className"
    :placeholder="placeholder"
    type="text"
    class="px-3 placeholder:text-slate-400 block w-full border border-slate-300 rounded-md shadow-sm w-10/12"
    @input="$emit('update-value:value', $event.target.value)"
    @keyup.enter="$emit('submit', $event.target.value)"
  />
</template>
