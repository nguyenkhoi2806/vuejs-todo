import { TODO_LIST } from "@/constants/todo";
import Todo from "@/models/Todo";

import LocalStorage from "./localStorage";

const Migration = {
  generateTodo(todoNumber: number) {
    const newTodoList: Todo[] = [];
    if (LocalStorage.loadTodo().length === 0) {
      for (let i = 1; i < todoNumber; i++) {
        newTodoList.push(
          new Todo({
            id: i,
            name: "Item " + i,
          })
        );
      }
      localStorage.setItem(TODO_LIST, JSON.stringify(newTodoList));
    }
  },
};

export default Migration;
