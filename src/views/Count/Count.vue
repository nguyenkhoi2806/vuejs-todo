<script>
import Button from "@/components/Button/Button.vue";

export default {
  name: "Count",
  components: {
    Button,
  },
  data() {
    return {
      count: 1,
    };
  },
  methods: {
    increase() {
      this.count = this.count + 1;
    },
    decrease() {
      this.count = this.count - 1;
    },
  },
};
</script>
<template>
  <div class="count">
    <div class="count-button">
      <Button label="+" :click="increase" />
      <Button label="-" :click="decrease" />
    </div>
    <p>Count: {{ count }}</p>
  </div>
</template>

<style lang="scss">
.count {
  &-button {
    display: flex;
    margin-bottom: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
    width: fit-content;

    &:nth-child(2) {
      margin-left: 1rem;
    }
  }
}
</style>
