"use strict";

const body = document.querySelector("body");
const container = document.querySelector(".container");
const theme = document.querySelector("#theme");
const bgImage = document.querySelector(".bg-image");
const form = document.querySelector("form");
const input = document.querySelector(".new-todo");
const todos = document.querySelector(".todos");
const crosses = document.querySelectorAll(".cross");
const inputCheck = document.querySelector(".bg-input-check");
const disableChecks = document.querySelectorAll(".bg-check");
const todoCount = document.querySelector(".items-left");
const clearComplete = document.querySelector(".clear-complete");

eventListeners();

function eventListeners() {
  theme.addEventListener("click", changeTheme);
  form.addEventListener("submit", addToDo);
  inputCheck.addEventListener("click", addToDo);
  crosses.forEach((cross) => {
    cross.addEventListener("click", removeTodo);
  });
  disableChecks.forEach((disableCheck) => {
    disableCheck.addEventListener("click", disableTodo);
  });
  clearComplete.addEventListener("click", removeAll);
}

function removeAll() {
  while (
    todos.firstElementChild &&
    todos.firstElementChild.tagName !== "FOOTER"
  ) {
    todos.firstElementChild.remove();
    todoCount.textContent = "0";
  }
}

function disableTodo() {
  this.parentNode.classList.toggle("disabled");
}

function removeTodo() {
  this.parentNode.remove();
  decreaseTodo();
}

function addToDo(e) {
  e.preventDefault();
  if (!input.value) {
    alert("Empty value!");
    return;
  }

  const checkImg = document.createElement("img");
  checkImg.className = `icon check`;
  checkImg.src = `assets/images/icon-check.svg`;

  const checkBg = document.createElement("div");
  checkBg.className = `icon-bg bg-check d-flex justify-content-center align-items-center`;
  checkBg.appendChild(checkImg);
  checkBg.addEventListener("click", disableTodo);

  const todoText = document.createElement("p");
  todoText.textContent = input.value;

  const crossImg = document.createElement("img");
  crossImg.src = `assets/images/icon-cross.svg`;
  crossImg.className = `icon cross`;
  crossImg.addEventListener("click", removeTodo);

  const newTodo = document.createElement("div");
  newTodo.className = `col col-12 box todo d-flex justify-content-between align-items-center`;

  newTodo.append(checkBg, todoText, crossImg);
  todos.prepend(newTodo);
  increaseTodo();
  input.value = "";
}

function increaseTodo() {
  let count = Number(todoCount.textContent);
  todoCount.textContent = ++count;
}

function decreaseTodo() {
  let count = Number(todoCount.textContent);
  todoCount.textContent = --count;
}

function changeTheme() {
  if (this.className.includes("icon-moon")) {
    this.classList.toggle("icon-moon");
    this.src = `assets/images/icon-sun.svg`;
    document.body.style.backgroundColor = `hsl(235, 21%, 11%)`;
    bgImage.src = `assets/images/bg-mobile-dark.jpg`;
    container.classList.remove("light");
    container.classList.add("dark");
  } else {
    this.classList.toggle("icon-moon");
    this.src = `assets/images/icon-moon.svg`;
    document.body.style.backgroundColor = `hsl(236, 33%, 92%)`;
    bgImage.src = `assets/images/bg-mobile-light.jpg`;
    container.classList.remove("dark");
    container.classList.add("light");
  }
}
