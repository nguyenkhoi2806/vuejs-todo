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
  actions: {
    addTodo(todo: Todo) {
      if (!todo || !todo.name) {
        return;
      }
      this.todoList.push(todo);
    },
    removeTodo(todoId: number) {
      this.todoList = this.todoList.filter((todo: Todo) => todo.id !== todoId);
    },
    loadTodo() {
      const todoList = localStorage.getItem(TODO_LIST);
      if (todoList) {
        this.todoList = JSON.parse(todoList).map(
          (todo: Todo) => new Todo(todo)
        );
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
    },
    resetTodoList() {
      this.todoList = [];
    },
  },
});

export default useTodoStore;
