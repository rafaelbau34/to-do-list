import { Projects } from "./projects";

export function addProject() {
  const projects = document.getElementById("projects");
  projects.innerHTML = "";
  Projects.projectList.forEach((project, index) => {
    const div = document.createElement("div");
    div.classList.add("project-list");

    const title = document.createElement("h3");
    title.textContent = project.name;

    div.appendChild(title);
    projects.appendChild(div);
  });
}

export function addToDo() {
  const todos = document.getElementById("todos");
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
  });

export default { projectForm, addProjectBtn };
