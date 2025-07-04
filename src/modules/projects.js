import { Todos } from "./class";

class Projects {
  static projectLIst = [];

  constructor(name = "Project") {
    this.name = name;
    this.todos = new Array();
    Projects.projectLIst.push(this);
  }

  addTodo(title, description, dueDate, priority) {
    this.todos.push(new Todos(title, description, dueDate, priority));
  }

  deleteTodo(selectedTodo) {
    this.todos = this.todos.filter((todo) => todo !== selectedTodo);
  }
}

export { Projects };
