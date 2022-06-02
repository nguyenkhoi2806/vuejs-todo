<script setup>
import "./todo.scss";

import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

import Todo from "@/models/todo";

import { useTodoStore } from "../../stores/todo";
import TodoItem from "./TodoItem/index.vue";
const { todoList, loading } = storeToRefs(useTodoStore());

useTodoStore().$subscribe((mutation, state) => {
  console.log(mutation);
  console.log(state);
});
</script>
<template>
  <div class="todo-page">
    <label class="block relative">
      <input
        v-model="todoName"
        class="placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md shadow-sm"
        placeholder="Search for anything..."
        type="text"
        name="search"
        required
        @keyup.enter="submit"
      />
      <span class="todo-page__icon absolute inset-y-0 flex items-center pr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
          strokeWidth="{2}"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
    </label>
  </div>
  <p v-if="loading">Loading todo list...</p>
  <div v-if="todoList.length > 0" class="todo-list">
    <TodoItem
      v-for="(todo, index) in todoList"
      :key="todo.id"
      :todo="todo"
      :index="index"
    />
  </div>
</template>

<script>
export default defineComponent({
  name: "Todo",
  components: {
    TodoItem,
  },
  data() {
    return {
      todoName: "",
    };
  },
  methods: {
    submit() {
      const todoStore = useTodoStore();
      const newTodo = new Todo({
        name: this.todoName,
      });
      todoStore.addTodo(newTodo);
      this.todoName = "";
    },
  },
});
</script>
