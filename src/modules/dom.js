import { saveProjectsToStorage } from "..";
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

    const delProjBtn = document.createElement("button");
    delProjBtn.textContent = "🗑️";
    delProjBtn.classList.add("delProjBtn");
    delProjBtn.addEventListener("click", () => {
      if (index > -1) {
        Projects.projectList.splice(index, 1);
        if (Projects.projectList.length > 0) {
          const newIndex = index > 0 ? index - 1 : 0;
          currentProject = Projects.projectList[newIndex];
        } else {
          currentProject = null;
        }
      }
      saveProjectsToStorage();
      addProject();
      if (currentProject) {
        addToDo(currentProject.todos);
      } else {
        document.getElementById("todos").innerHTML = "";
      }
    });

    // div.addEventListener("click", () => {
    //   currentProject = project;
    //   addToDo(project.todos);
    // });

    div.appendChild(button);
    div.appendChild(delProjBtn);
    projects.appendChild(div);
  });
}

export function addToDo(todoList = []) {
  const todos = document.getElementById("todos");
  todos.innerHTML = "";
  todoList.forEach((todo) => {
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
    toggleBtn.textContent = todo.isComplete ? "✔️" : "❌";
    toggleBtn.style.color = todo.isComplete ? "green" : "red";
    toggleBtn.addEventListener("click", () => {
      todo.toggleComplete();
      saveProjectsToStorage();
      addToDo(todoList);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", () => {
      const index = currentProject.todos.indexOf(todo);
      if (index > -1) {
        currentProject.todos.splice(index, 1);
        saveProjectsToStorage();
        addToDo(currentProject.todos);
      }
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => {
      document.querySelector(".todoFormContainer").style.display = "flex";
      const form = document.getElementById("todo-form-get");
      form.title.value = todo.title;
      form.desc.value = todo.description;
      form.dueDate.value = todo.value;
      form.priority.value = todo.priority;

      form.dataset.editing = "true";
      form.dataset.todoIndex = currentProject.todos.indexOf(todo);
    });

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(dueDate);
    card.appendChild(priority);
    card.appendChild(status);
    card.appendChild(toggleBtn);
    card.appendChild(editBtn);
    card.appendChild(deleteBtn);

    todos.appendChild(card);
  });
}

export function createDefaultProject() {
  if (!localStorage.getItem("projects")) {
    const defaultProject = new Projects("Project");
    defaultProject.addTodo("Buy a lambo", "A gray one", "2025-07-07", "High");
    setCurrentProject(defaultProject);

    saveProjectsToStorage();
  }
}

export function setCurrentProject(project) {
  currentProject = project;
}

export function getCurrentProject() {
  return currentProject;
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

  currentProject = newProject;

  saveProjectsToStorage();
  addProject();
  addToDo(currentProject.todos);

  e.target.reset();
  projectForm.style.display = "none";
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

    if (!currentProject) {
      alert("Please select a project first");
      return;
    }

    const isEditing = e.target.dataset.editing === "true";
    if (isEditing) {
      const index = parseInt(e.target.dataset.todoIndex);
      const todo = currentProject.todos[index];

      if (dueDate) todo.dueDate = dueDate;

      todo.title = title;
      todo.description = desc;
      todo.priority = priority;

      e.target.dataset.editing = "false";
      e.target.removeAttribute("data-todo-index");
    } else {
      currentProject.addTodo(title, desc, dueDate, priority);
    }

    saveProjectsToStorage();
    addToDo(currentProject.todos);
    e.target.reset();
    document.querySelector(".todoFormContainer").style.display = "none";
  });
