<script setup>
import "./todo.scss";

import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

import { TODO_LIST, TODO_TAB } from "@/constants/todo";
import Todo from "@/models/todo";

import { useTodoStore } from "../../stores/todo";
import TodoItem from "./TodoItem/index.vue";
const { todoList, loading } = storeToRefs(useTodoStore());

const store = useTodoStore();
store.$subscribe((mutation, state) => {
  if (mutation.events.target) {
    let todoList;
    if (mutation.events.target.todoList) {
      todoList = mutation.events.target.todoList;
    } else {
      todoList = mutation.events.target;
    }
    localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
  }
});
</script>
<template>
  <div class="todo-page">
    <label class="block relative">
      <input
        v-model="todoName"
        class="placeholder:text-slate-400 block w-full border border-slate-300 rounded-md shadow-sm"
        placeholder="Add new todo"
        type="text"
        name="search"
        required
        @keyup.enter="submit"
      />
      <ul
        id="tabs-tab"
        class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
        role="tablist"
      >
        <li
          v-for="(tab, index) in TODO_TAB"
          :key="index"
          class="nav-item"
          role="presentation"
        >
          <a
            id="tabs-home-tab"
            class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
            data-bs-toggle="pill"
            data-bs-target="#tabs-home"
            role="tab"
            aria-controls="tabs-home"
            aria-selected="true"
            :href="'#' + tab.id"
          >
            {{ tab.name }}
          </a>
        </li>
      </ul>
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
      :key="index"
      :todo="todo"
      :index="index"
      :autofocus="autofocus"
      :delete-todo="deleteTodo"
      :update-status="updateStatus"
      :update-name="updateName"
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
      store: useTodoStore(),
      autofocus: false,
    };
  },
  mounted() {
    this.store.loadTodo();
  },
  methods: {
    submit() {
      const newTodo = new Todo({
        name: this.todoName,
      });
      this.store.addTodo(newTodo);
      this.todoName = "";
    },
    deleteTodo(id) {
      if (confirm("Are you sure to delete? ")) {
        this.store.removeTodo(id);
      }
    },
    updateStatus(todo) {
      todo.status = !todo.status;
      this.store.updateTodoList(todo);
    },
    updateName(todo, name) {
      todo.name = name;
      this.store.updateTodoList(todo);
    },
  },
});
</script>
