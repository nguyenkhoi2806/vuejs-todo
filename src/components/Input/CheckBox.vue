<script>
export default {
  name: "CheckboxCustom",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update-value:value"],
};
</script>

<template>
  <input
    :id="id"
    :checked="value"
    :value="value"
    :class="value ? 'checked' : 'un-checked'"
    class="checkbox-custom"
    type="checkbox"
    @change="$emit('update-value:value', $event.target.checked)"
  />
</template>

<style scope>
.checkbox-custom[type="checkbox"] {
  height: 1.5rem;
  width: 1.5rem;
}

.checkbox-custom.checked[type="checkbox"] {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-color: #2563eb;
}

.checkbox-custom.un-checked[type="checkbox"] {
  background-image: none;
  background-color: white;
  outline: none;
}
</style>
