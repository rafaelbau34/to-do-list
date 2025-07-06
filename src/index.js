import "./style.css";
import { Todos } from "./modules/class.js";
import { Projects } from "./modules/projects.js";
import { addProject } from "./modules/dom.js";

export function createDefaultProject() {
  if (!localStorage.getItem("projects")) {
    const defaultProject = new Projects("Project");
    defaultProject.addTodo("Buy a lambo", "A gray one", "2025-07-07", "High");
    saveProjectsToStorage();
  }
}

export function saveProjectsToStorage() {
  const data = Projects.projectList.map((project) => ({
    name: project.name,
    todos: project.todos.map((todo) => ({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      priority: todo.priority,
      isComplete: todo.isComplete,
    })),
  }));

  localStorage.setItem("projects", JSON.stringify(data));
}

function loadProjects() {
  const data = JSON.parse(localStorage.getItem("projects"));
  if (!data) return;

  data.forEach((project) => {
    const loadedProject = new Projects(project.name);

    project.todos.forEach((todo) => {
      const newTodo = new Todos(
        todo.title,
        todo.description,
        todo.dueDate,
        todo.priority
      );
      newTodo.isComplete = todo.isComplete;
      loadedProject.todos.push(newTodo);
    });
  });
}

function init() {
  loadProjects();
  createDefaultProject();
  addProject();
}
init();
