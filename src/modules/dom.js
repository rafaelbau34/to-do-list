import { Projects } from "./projects";
export let currentProject = null;

export function addProject() {
  const projects = document.getElementById("projects");
  projects.innerHTML = "";
  Projects.projectList.forEach((project, index) => {
    const div = document.createElement("div");
    div.classList.add("project-list");

    const button = document.createElement("button");
    button.textContent = project.name;
    button.classList.add("project-btn");
    button.addEventListener("click", () => {
      currentProject = project;
      addToDo(project.todos);
    });

    div.addEventListener("click", () => {
      currentProject = project;
      addToDo(project.todos);
    });

    div.appendChild(button);
    projects.appendChild(div);
  });
}

export function addToDo(todoList = []) {
  const todos = document.getElementById("todos");
  todos.innerHTML = "";
  todoList.forEach((todo, index) => {
    const card = document.createElement("div");
    card.classList.add("todo-card");

    const title = document.createElement("h3");
    title.textContent = todo.title;

    const description = document.createElement("p");
    description.textContent = todo.description;

    const dueDate = document.createElement("p");
    dueDate.textContent = `Due: ${todo.dueDate}`;

    const priority = document.createElement("p");
    priority.textContent = `Priority: ${todo.priority}`;

    const status = document.createElement("p");
    status.textContent = todo.isComplete ? "Complete" : "Incomplete";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle";
    toggleBtn.addEventListener("click", () => {
      todo.toggleComplete();
      addToDo(todoList);
    });

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(dueDate);
    card.appendChild(priority);
    card.appendChild(status);
    card.appendChild(toggleBtn);

    todos.appendChild(card);
  });
}

const projectForm = document.querySelector(".project-form");
const addProjectBtn = document.getElementById("addProjectBtn");
const closeBtn = document.querySelector(".closeBtn");

addProjectBtn.addEventListener("click", () => {
  projectForm.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  projectForm.style.display = "none";
});

document.getElementById("form-data").addEventListener("submit", function (e) {
  e.preventDefault();

  const neim = e.target.title.value;

  const newProject = new Projects(neim);
  addProject();
  e.target.reset();
});

const todoBtn = document.getElementById("todoBtn");
const todoFormContainer = document.querySelector(".todoFormContainer");
const todoX = document.querySelector(".todoX");

todoBtn.addEventListener("click", () => {
  todoFormContainer.style.display = "flex";
});

todoX.addEventListener("click", () => {
  todoFormContainer.style.display = "none";
});

document
  .getElementById("todo-form-get")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const title = e.target.title.value;
    const desc = e.target.desc.value;
    const dueDate = e.target.dueDate.value;
    const priority = e.target.priority.value;

    if (currentProject) {
      currentProject.addTodo(title, desc, dueDate, priority);
      addToDo(currentProject.todos);
      e.target.reset();
    } else {
      alert("Please select a project first");
    }
  });

//export default { projectForm, addProjectBtn };
