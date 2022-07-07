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

import ConfirmModal from "../../components/ConfirmModal/ConfirmModal.vue";
import { useTodoStore } from "../../stores/todo";
import TodoItem from "./TodoItem/TodoItem.vue";

export default defineComponent({
  name: "Todo",
  components: {
    TodoItem,
    ConfirmModal,
  },
  setup() {
    const store = useTodoStore();
    const { loading, todoList } = storeToRefs(store);
    store.loadTodo();
    store.$subscribe((mutation, _) => {
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
      filterActive: ALL,
      shouldShowConfirm: false,
      idDeleted: null,
    };
  },
  computed: {
    filteredTodoByStatus() {
      const { todoList, filterActive } = this;
      if (filterActive === COMPLETED) {
        return todoList.filter((todo) => todo.status);
      } else if (filterActive === UNCOMPLETED) {
        return todoList.filter((todo) => !todo.status);
      }
      return todoList;
    },
  },
  methods: {
    submit() {
      const newTodo = new Todo({
        name: this.todoName,
      });
      this.store.addTodo(newTodo);
      this.todoName = "";
    },
    openShowConfirmModal(id) {
      this.shouldShowConfirm = true;
      this.todoSelected = this.todoList.find((todo) => todo.id === id);
      // if (confirm("Are you sure to delete? ")) {
      //   this.store.removeTodo(id);
      // }
    },
    updateStatus(todo) {
      todo.status = !todo.status;
      this.store.updateTodoList(todo);
    },
    updateName(todo, name) {
      todo.name = name;
      this.store.updateTodoList(todo);
    },
    onChangeFilter(filter) {
      this.filterActive = filter;
    },
    deleteAll() {
      if (confirm("Are you sure to delete all? ")) {
        this.store.resetTodoList();
      }
    },
    deleteTodo() {
      this.store.removeTodo(this.todoSelected.id);
      this.shouldShowConfirm = false;
    },
    closeModal() {
      this.shouldShowConfirm = false;
    },
  },
});
</script>

<template>
  <div class="todo-page">
    <label class="flex flex-row justify-between">
      <input
        v-model="todoName"
        class="placeholder:text-slate-400 block w-full border border-slate-300 rounded-md shadow-sm w-10/12"
        placeholder="Add new todo"
        type="text"
        name="search"
        required
        @keyup.enter="submit"
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 rounded w-1/12"
        @click="submit"
      >
        Add
      </button>
    </label>
    <div class="flex space-x-2 justify-between my-3">
      <div class="flex">
        <button
          v-for="(status, index) in TODO_STATUS"
          :key="index"
          type="button"
          class="px-6 py-2.5 font-medium text-xs leading-tight uppercase"
          :class="{
            'todo-status--active': status.value == filterActive,
          }"
          :onclick="() => onChangeFilter(status.value)"
        >
          {{ status.label }}
        </button>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 rounded"
        @click="deleteAll"
      >
        Delete all
      </button>
    </div>
  </div>
  <p v-if="loading">Loading todo list...</p>
  <div
    v-if="filteredTodoByStatus.length > 0"
    class="todo-list"
    :class="{
      'todo-list--scroll': filteredTodoByStatus.length > 15,
    }"
  >
    <TodoItem
      v-for="(todo, index) in filteredTodoByStatus"
      :key="index"
      :todo="todo"
      :index="index"
      :delete-todo="openShowConfirmModal"
      :update-status="updateStatus"
      :update-name="updateName"
    />
  </div>
  <div v-if="filteredTodoByStatus.length === 0">
    <i> Empty todo list </i>
  </div>
  <ConfirmModal
    v-if="shouldShowConfirm"
    :on-confirm="deleteTodo"
    :on-close="closeModal"
    width="xs"
    title="Are you sure to delete"
  />
</template>
