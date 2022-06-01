<script setup>
import Todo from "@/models/todo";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useTodoStore } from "../../stores/todo";
import "./todo.scss";
import TodoItem from "./TodoItem/index.vue";

const { todoList, loading } = storeToRefs(useTodoStore());
</script>
<template>
  <div class="todo-page">
    <label class="block relative">
      <input
        class="placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md shadow-sm"
        placeholder="Search for anything..."
        type="text"
        name="search"
        @keyup.enter="submit"
        v-model="todoName"
        required
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
  <div class="todo-list" v-if="todoList.length > 0">
    <TodoItem
      v-for="(todo, index) in todoList"
      :todo="todo"
      :index="index"
      :key="todo.id"
    />
  </div>
</template>

<script>
export default defineComponent({
  name: "todo",
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
