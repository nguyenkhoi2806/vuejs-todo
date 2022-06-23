interface ITodo {
  name: string;
  status?: boolean;
}

class Todo implements ITodo {
  id: number;
  name: string;
  status: boolean;
  constructor(todo: ITodo) {
    this.id = Math.random();
    this.name = todo.name;
    this.status = todo.status ? todo.status : false;
  }
}

export default Todo;
