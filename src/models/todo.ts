interface ITodo {
  name: string;
  status?: boolean;
  isFocus?: boolean;
}

class Todo implements ITodo {
  id: number;
  name: string;
  status: boolean;
  isFocus: boolean;

  constructor(todo: ITodo) {
    this.id = Math.random();
    this.name = todo.name;
    this.status = todo.status ? todo.status : false;
    this.isFocus = todo.isFocus ? todo.isFocus : false;
  }
}

export default Todo;
