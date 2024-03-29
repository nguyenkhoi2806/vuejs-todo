<script>
import moment from "moment";

import CheckBoxCustom from "@/components/Input/CheckBox.vue";
import InputTextCustom from "@/components/Input/Text.vue";
import Todo from "@/models/Todo";

export default {
  name: "TodoItem",
  components: {
    InputTextCustom,
    CheckBoxCustom,
  },
  props: {
    todo: Todo,
    deleteTodo: {
      type: Function,
      default() {
        return;
      },
    },
    updateStatus: {
      type: Function,
      default() {
        return;
      },
    },
    updateName: {
      type: Function,
      default() {
        return;
      },
    },
  },
  data(props) {
    return {
      isUpdateName: false,
      moment,
      todoName: props.todo.name,
      toStatus: props.todo.status,
    };
  },
  watch: {
    todoName: {
      handler() {
        this.updateName(this.todo, this.todoName);
      },
    },
    toStatus: {
      handler() {
        this.updateStatus(this.todo);
      },
    },
  },
  methods: {
    shouldRenderInputName() {
      this.isUpdateName = !this.isUpdateName;
      this.focusOnInputName();
    },
    onPressEnter(event) {
      if (event.key === "Enter") {
        this.isUpdateName = !this.isUpdateName;
      }
    },
    onClickOutside() {
      this.isUpdateName = false;
    },
    focusOnInputName() {
      this.$nextTick(() => {
        const inputNameRef = this.$refs.inputName;
        if (inputNameRef) {
          inputNameRef.focus();
        }
      });
    },
  },
};
</script>

<template>
  <div
    class="todo-item my-4 flex justify-between space-x-4 w-full text-center items-center"
  >
    <CheckBoxCustom
      :id="todo.id"
      v-model:value="toStatus"
      @update-value:value="toStatus = $event"
    />
    <div class="text-left w-11/12">
      <div
        class="todo-item__label"
        :class="{
          'todo-item__label-done': todo.status,
        }"
      >
        <InputTextCustom
          v-if="isUpdateName"
          v-model:value="todoName"
          v-click-outside="onClickOutside"
          class="px-2 h-10 placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md shadow-sm"
          @update-value:value="todoName = $event"
          @keypress="(event) => onPressEnter(event)"
        />
        <label
          v-if="!isUpdateName && todo.name"
          :for="todo.id"
          class="todo-item__name"
        >
          {{ todo.name }}
        </label>
        <i v-if="!todo.name && !isUpdateName"> No title </i>
      </div>
      <p class="todo-item__time">
        {{ moment(todo.createdDate, "MMMM Do YYYY, h:mm:ss a").fromNow() }}
      </p>
    </div>
    <span class="todo-item__edit" @click="shouldRenderInputName()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        class="w-7"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </span>
    <span class="todo-item__delete" @click="deleteTodo(todo.id)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="black"
        strokeWidth="{2}"
        class="w-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/common/variable.scss";

.todo-item {
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;

  &__delete,
  &__edit {
    padding: 0.5rem;
    background-color: $background-color;
    cursor: pointer;

    svg {
      width: 1.5rem;
    }
  }

  &__time {
    font-size: 12px;
    font-style: italic;
  }

  &__label {
    font-size: 14px;
    font-weight: bold;
    color: gray;

    &-done {
      .todo-item {
        &__name {
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
