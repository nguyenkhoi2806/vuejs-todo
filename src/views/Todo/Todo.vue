<script>
import "./todo.scss";

import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

import {
  ALL,
  COMPLETED,
  TODO_LIST,
  TODO_STATUS,
  UNCOMPLETED,
} from "@/constants/todo";
import Todo from "@/models/todo";

import { useTodoStore } from "../../stores/todo";
import TodoItem from "./TodoItem/TodoItem.vue";

export default defineComponent({
  name: "Todo",
  components: {
    TodoItem,
  },
  setup() {
    const store = useTodoStore();
    const { loading, todoList } = storeToRefs(store);
    store.loadTodo();
    store.$subscribe((mutation, state) => {
      if (mutation.events.target) {
        let newTodoList;
        if (mutation.events.target.todoList) {
          newTodoList = mutation.events.target.todoList;
        } else {
          newTodoList = mutation.events.target;
        }
        localStorage.setItem(TODO_LIST, JSON.stringify(newTodoList));
      }
    });

    return {
      store,
      TODO_STATUS,
      loading,
      todoList,
    };
  },
  data() {
    return {
      todoName: "",
      statusActive: ALL,
    };
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
    onChangeStatus(status) {
      this.statusActive = status;
    },
    filteredTodoByStatus(todoList, statusActive) {
      if (statusActive === COMPLETED) {
        return todoList.filter((todo) => todo.status);
      } else if (statusActive === UNCOMPLETED) {
        return todoList.filter((todo) => !todo.status);
      }
      return todoList;
    },
  },
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
    <div class="flex space-x-2 justify-space-between my-3">
      <button
        v-for="(status, index) in TODO_STATUS"
        :key="index"
        type="button"
        class="px-6 py-2.5 font-medium text-xs leading-tight uppercase"
        :class="{
          'todo-status--active': status.value == statusActive,
        }"
        :onclick="() => onChangeStatus(status.value)"
      >
        {{ status.label }}
      </button>
    </div>
    <div id="tabs-tabContent" class="tab-content"></div>
  </div>
  <p v-if="loading">Loading todo list...</p>
  <div
    v-if="filteredTodoByStatus(todoList, statusActive).length > 0"
    class="todo-list"
  >
    <TodoItem
      v-for="(todo, index) in filteredTodoByStatus(todoList, statusActive)"
      :key="index"
      :todo="todo"
      :index="index"
      :delete-todo="deleteTodo"
      :update-status="updateStatus"
      :update-name="updateName"
    />
  </div>
</template>
