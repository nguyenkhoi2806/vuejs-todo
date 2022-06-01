interface ITodo {
  name: string;
}

class Todo implements ITodo {
  id: number;
  name: string;
  status: boolean;
  constructor(todo: ITodo) {
    this.id = Math.random();
    this.name = todo.name;
    this.status = false;
  }
}

export default Todo;
