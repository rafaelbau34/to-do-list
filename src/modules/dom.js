const projectForm = document.querySelector(".project-form");
const addProjectBtn = document.getElementById("addProjectBtn");
const closeBtn = document.querySelector(".closeBtn");

addProjectBtn.addEventListener("click", () => {
  projectForm.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  projectForm.style.display = "none";
});

export default { projectForm, addProjectBtn };
