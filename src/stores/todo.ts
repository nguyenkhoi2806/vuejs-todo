import { defineStore } from "pinia";

import { TODO_LIST } from "@/constants/todo";
import Todo from "@/models/todo";

type TodoType = {
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
    loadTodo() {
      const todoList = localStorage.getItem(TODO_LIST);
      if (todoList) {
        console.log(todoList);
        console.log(JSON.parse(todoList));
        this.todoList = JSON.parse(todoList).map(
          (todo: Todo) => new Todo(todo)
        );
      }
    },
  },
});

export default useTodoStore;
