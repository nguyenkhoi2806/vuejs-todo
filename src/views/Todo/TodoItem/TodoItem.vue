<script>
import "./todo-item.scss";

import Todo from "@/models/todo";

export default {
  name: "TodoItem",
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
  data() {
    return {
      isUpdateName: false,
    };
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
    <input
      :id="todo.id"
      :checked="todo.status"
      type="checkbox"
      class="todo-item__checkbox appearance-none checked:bg-blue-500 w-4 outline-0"
      @click="updateStatus(todo)"
    />
    <div class="text-left w-11/12">
      <input
        v-if="isUpdateName"
        ref="inputName"
        v-click-outside="onClickOutside"
        :value="todo.name"
        type="text"
        class="h-10 placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md shadow-sm"
        @change="(event) => updateName(todo, event.target.value)"
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      class="todo-item__delete w-7"
      @click="shouldRenderInputName(todo)"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="black"
      strokeWidth="{2}"
      class="todo-item__delete w-7"
      @click="deleteTodo(todo.id)"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  </div>
</template>
