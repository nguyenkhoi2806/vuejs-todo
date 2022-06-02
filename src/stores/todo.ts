import Todo from "@/models/todo";
import { defineStore } from "pinia";

export type TodoType = {
  todoList: Todo[];
  loading: boolean;
};

export const useTodoStore = defineStore({
  id: "todo",
  state: () =>
    ({
      todoList: [],
      loading: false,
    } as TodoType),
  getters: {},
  actions: {
    addTodo(todo: Todo) {
      if (!todo) return;
      this.todoList.push(todo);
    },
  },
});

export default useTodoStore;
