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
import { useThemeStore } from "../../stores/theme";
import { useTodoStore } from "../../stores/todo";
import TodoItem from "./TodoItem/TodoItem.vue";

export default defineComponent({
  name: "Todo",
  components: {
    TodoItem,
    ConfirmModal,
  },
  setup() {
    const todoStore = useTodoStore();
    const themeStore = useThemeStore();
    const { loading, todoList } = storeToRefs(todoStore);
    const { showProgress } = storeToRefs(themeStore);
    todoStore.loadTodo();

    todoStore.$subscribe((mutation, state) => {
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
      todoStore,
      TODO_STATUS,
      loading,
      todoList,
      showProgress,
    };
  },
  data() {
    return {
      todoName: "",
      filterActive: ALL,
      shouldShowConfirm: false,
      idDeleted: null,
      titleConfirmModal: "",
      isDeleteAll: false,
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

    percentTodoComplete() {
      const { todoList } = this;
      const todoCompleted = todoList.filter((todo) => todo.status);
      if (todoCompleted.length > 0) {
        return ((todoCompleted.length / todoList.length) * 100).toFixed(1);
      }

      return 0;
    },
  },
  methods: {
    submit() {
      const newTodo = new Todo({
        name: this.todoName,
      });
      this.todoStore.addTodo(newTodo);
      this.todoName = "";
    },
    openShowConfirmModal(id) {
      const todoSelected = this.todoList.find((todo) => todo.id === id);
      if (todoSelected) {
        this.shouldShowConfirm = true;
        this.todoSelected = todoSelected;
        this.titleConfirmModal =
          "Are you sure to delete " + todoSelected.name + "";
      }
    },
    updateStatus(todo) {
      todo.status = !todo.status;
      this.todoStore.updateTodoList(todo);
    },
    updateName(todo, name) {
      todo.name = name;
      this.todoStore.updateTodoList(todo);
    },
    onChangeFilter(filter) {
      this.filterActive = filter;
    },
    showConfirmDeleteAll() {
      this.titleConfirmModal = "Are you sure to delete all? ";
      this.shouldShowConfirm = true;
      this.isDeleteAll = true;
    },
    deleteAllTodo() {
      this.todoStore.resetTodoList();
    },
    deleteTodo() {
      this.todoStore.removeTodo(this.todoSelected.id);
    },
    submitConfirmDelete() {
      if (this.isDeleteAll) {
        this.deleteAllTodo();
      } else {
        this.deleteTodo();
      }
      this.shouldShowConfirm = false;
    },
    closeModal() {
      this.shouldShowConfirm = false;
      this.isDeleteAll = false;
    },
  },
});
</script>

<template>
  <div v-if="showProgress" class="w-full bg-blue-200 rounded-full mt-4">
    <div
      class="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
      :style="'width:' + percentTodoComplete + '%'"
    >
      {{ percentTodoComplete }}%
    </div>
  </div>
  <div class="todo-page">
    <label class="flex flex-row justify-between">
      <input
        v-model="todoName"
        class="px-3 placeholder:text-slate-400 block w-full border border-slate-300 rounded-md shadow-sm w-10/12"
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
        v-if="todoList.length > 0"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 rounded"
        @click="showConfirmDeleteAll"
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
    :on-confirm="submitConfirmDelete"
    :on-close="closeModal"
    :title="titleConfirmModal"
    width="sm"
    confirm-text="Delete"
  />
</template>
