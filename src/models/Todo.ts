import moment from "moment";

interface ITodo {
  id?: number;
  name: string;
  status?: boolean;
  createdDate?: string;
}

class Todo implements ITodo {
  id: number;
  name: string;
  status: boolean;
  createdDate: string;

  constructor(todo: ITodo) {
    this.id = todo.id ? todo.id : Math.random();
    this.name = todo.name;
    this.status = todo.status ? todo.status : false;
    this.createdDate = todo.createdDate
      ? todo.createdDate
      : moment().format("MMMM Do YYYY, h:mm:ss a");
  }
}

export default Todo;
