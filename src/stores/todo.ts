import { defineStore } from "pinia";

import LocalStorage from "@/services/localStorage";

import Todo from "../models/Todo";

type TodoType = {
  todoList: Todo[];
  loading: boolean;
  limitLoadTodo: Number;
};

export const useTodoStore = defineStore({
  id: "todo",
  state: () =>
    ({
      todoList: [],
      loading: false,
      limitLoadTodo: 15,
    } as TodoType),
  actions: {
    addTodo(todo: Todo) {
      if (!todo || !todo.name) {
        return;
      }
      this.todoList.push(todo);
      LocalStorage.pushNewTodo(todo);
      this.loadTodo();
    },
    removeTodo(todoId: number) {
      this.todoList = this.todoList.filter((todo: Todo) => todo.id !== todoId);
      LocalStorage.removeTodo(todoId);
    },
    loadTodo() {
      const todoList = LocalStorage.loadTodo();
      if (todoList) {
        this.todoList = todoList
          .filter((_: Todo, index: number) => index < this.limitLoadTodo)
          .map((todo: Todo) => new Todo(todo));
      }
    },
    updateTodoList(todo: Todo) {
      this.todoList = this.todoList.map((todoItem) => {
        if (todoItem.id === todo.id) {
          return todo;
        } else {
          return todoItem;
        }
      });
      LocalStorage.updateToList(todo);
    },
    resetTodoList() {
      this.todoList = [];
      LocalStorage.deleteAllToDoList();
    },

    updateLimitLoadTodo() {
      return new Promise((resolve) => {
        this.limitLoadTodo = Number(this.limitLoadTodo) + 8;
        this.loadTodo();
        resolve(this.todoList);
      });
    },
  },
});

export default useTodoStore;
