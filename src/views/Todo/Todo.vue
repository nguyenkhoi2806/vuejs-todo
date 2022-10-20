<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

import {
  ALL,
  COMPLETED, 
  TODO_STATUS,
  UNCOMPLETED,
} from "@/constants/todo";
import Todo from "@/models/Todo";
import LocalStorage from "@/services/localStorage";
import Migration from "@/services/migration";

import ConfirmModal from "../../components/ConfirmModal/ConfirmModal.vue";
import InputTextCustom from "../../components/Input/Text.vue";
import { useSettingStore } from "../../stores/setting";
import { useTodoStore } from "../../stores/todo";
import TodoItem from "./TodoItem/TodoItem.vue";

export default defineComponent({
  name: "Todo",
  components: {
    TodoItem,
    ConfirmModal,
    InputTextCustom,
  },
  setup() {
    const todoStore = useTodoStore();
    const settingStore = useSettingStore();
    const { loading, todoList } = storeToRefs(todoStore);
    const { showProgress, themeSelected } = storeToRefs(settingStore);

    return {
      todoStore,
      TODO_STATUS,
      loading,
      todoList,
      showProgress,
      themeSelected,
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
      percentTodoComplete: 0,
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
  watch: {
    todoList: {
      deep: true,
      handler() {
        this.calPercentTodoComplete();
      },
    },
  },
  created() {
    const { todoStore } = this;
    todoStore.loadTodo();
  },
  mounted() {
    Migration.generateTodo(30);
    this.calPercentTodoComplete();
    window.addEventListener("scroll", this.handleLoadTodo);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleLoadTodo);
  },
  methods: {
    handleLoadTodo() {
      if (
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight ===
        document.documentElement.offsetHeight
      ) {
        this.todoStore.updateLimitLoadTodo();
      }
    },
    submit() {
      const newTodo = new Todo({
        id: LocalStorage.getIdLastTodo() + 1,
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
    calPercentTodoComplete() {
      const { todoList } = this;
      const todoCompleted = todoList.filter((todo) => todo.status);
      this.percentTodoComplete = (
        (todoCompleted.length / todoList.length) *
        100
      ).toFixed(1);
    },
  },
});
</script>

<template>
  <div
    v-if="showProgress"
    class="w-full rounded-full mt-4"
    :class="'bg-' + themeSelected.name.toLowerCase() + '-200'"
  >
    <div
      class="text-xs font-medium text-center p-0.5 leading-none rounded-full"
      :class="[
        'bg-' + themeSelected.name.toLowerCase() + '-500',
        'text-' + themeSelected.textColor,
      ]"
      :style="'width:' + percentTodoComplete + '%'"
    >
      {{ percentTodoComplete }}%
    </div>
  </div>
  <div class="todo-page">
    <label class="flex flex-row justify-between">
      <InputTextCustom
        v-model:value="todoName"
        placeholder="Add new todo"
        required
        @update-value:value="todoName = $event"
        @submit="submit"
      />
      <button
        class="font-bold px-2 py-2 rounded w-1/12"
        :class="[
          'bg-' + themeSelected.backgroundColor,
          'text-' + themeSelected.textColor,
          'hover:bg' + themeSelected.textColor + '-700',
        ]"
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
          :style="{
            '--color-active': themeSelected.colorRGB,
          }"
          :onclick="() => onChangeFilter(status.value)"
        >
          {{ status.label }}
        </button>
      </div>
      <button
        v-if="todoList.length > 0"
        class="font-bold px-2 py-2 rounded"
        :class="[
          'bg-' + themeSelected.backgroundColor,
          'text-' + themeSelected.textColor,
          'hover:bg' + themeSelected.textColor + '-700',
        ]"
        @click="showConfirmDeleteAll"
      >
        Delete all
      </button>
    </div>
  </div>
  <p v-if="loading">Loading todo list...</p>
  <div v-if="filteredTodoByStatus.length > 0" class="todo-list">
    <TodoItem
      v-for="todo in filteredTodoByStatus"
      :key="todo.id"
      :todo="todo"
      :index="todo.id"
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

<style lang="scss" scoped>
@import "../../assets/scss/common/variable.scss";
.todo {
  &-page {
    padding-top: 1rem;

    &__icon {
      right: 0;
      padding-right: 1rem;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }

  &-status {
    &--active {
      border-bottom: 1px solid var(--color-active);
      color: var(--color-active);
    }
  }
}
</style>
