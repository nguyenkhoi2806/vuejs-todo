<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

import Button from "@/components/Button/Button.vue";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal.vue";
import InputTextCustom from "@/components/Input/Text.vue";
import Loading from "@/components/Loading/Loading.vue";
import { ALL, COMPLETED, TODO_STATUS, UNCOMPLETED } from "@/constants/todo";
import Todo from "@/models/Todo";
import LocalStorage from "@/services/localStorage";
import Migration from "@/services/migration";
import { useSettingStore } from "@/stores/setting";
import { useTodoStore } from "@/stores/todo";

import TodoItem from "./TodoItem/TodoItem.vue";

export default defineComponent({
  name: "Todo",
  components: {
    TodoItem,
    ConfirmModal,
    InputTextCustom,
    Loading,
    Button,
  },
  async setup() {
    const todoStore = useTodoStore();
    const settingStore = useSettingStore();
    const { loading, todoList, limitLoadTodo } = storeToRefs(todoStore);
    const { showProgress, themeSelected } = storeToRefs(settingStore);

    todoStore.loadTodo();
    Migration.generateTodo(100);

    return {
      todoStore,
      TODO_STATUS,
      loading,
      todoList,
      showProgress,
      themeSelected,
      limitLoadTodo,
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
      isLoading: false,
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
    this.calPercentTodoComplete();
  },
  mounted() {
    window.addEventListener("scroll", this.handleLoadTodo);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleLoadTodo);
  },
  methods: {
    shouldLoadMoreTodo() {
      const { isLoading, limitLoadTodo, todoList } = this;
      return (
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight ===
          document.documentElement.offsetHeight &&
        limitLoadTodo <= todoList.length &&
        !isLoading
      );
    },
    handleLoadTodo() {
      if (this.shouldLoadMoreTodo()) {
        this.isLoading = true;
        setTimeout(() => {
          this.todoStore.updateLimitLoadTodo().then(() => {
            this.isLoading = false;
          });
        }, 2000);
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
      <Button :click="submit" label="Add" />
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
      <Button
        v-if="filteredTodoByStatus.length > 0"
        :click="showConfirmDeleteAll"
        label="Delete all"
      />
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
  <Loading v-if="isLoading" />
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
