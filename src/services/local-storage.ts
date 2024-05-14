import _ from "lodash";

import { TODO_LIST } from "@/constants/todo";
import Todo from "@/models/todo";

const LocalStorage = {
  updateToList(todo: Todo) {
    let todoList = localStorage.getItem(TODO_LIST);
    if (todoList) {
      todoList = JSON.parse(todoList).map((todoItem: Todo) => {
        if (todoItem.id === todo.id) {
          return todo;
        } else {
          return todoItem;
        }
      });
      localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
    }
  },
  pushNewTodo(todo: Todo) {
    let todoList = localStorage.getItem(TODO_LIST);
    if (todoList) {
      todoList = JSON.parse(todoList).concat([todo]);
      localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
    }
  },

  loadTodo() {
    const todoList = localStorage.getItem(TODO_LIST);
    if (todoList) {
      return _.orderBy(JSON.parse(todoList), ["id"], ["desc"]);
    }
    return [];
  },

  deleteAllToDoList() {
    localStorage.setItem(TODO_LIST, JSON.stringify([]));
  },

  removeTodo(todoId: number) {
    let todoList = localStorage.getItem(TODO_LIST);
    if (todoList) {
      todoList = JSON.parse(todoList).filter(
        (todoItem: Todo) => todoItem.id !== todoId,
      );
      localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
    }
  },

  getIdLastTodo() {
    if (this.loadTodo().length > 0) {
      return this.loadTodo()[0].id;
    }
    return 1;
  },
};

export default LocalStorage;
