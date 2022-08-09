import moment from "moment";
interface ITodo {
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
    this.id = Math.random();
    this.name = todo.name;
    this.status = todo.status ? todo.status : false;
    this.createdDate = todo.createdDate
      ? todo.createdDate
      : moment().format("MMMM Do YYYY, h:mm:ss a");
  }
}

export default Todo;
