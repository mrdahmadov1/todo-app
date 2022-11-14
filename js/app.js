"use strict";

/**
 * Selecting
 */
const body = document.querySelector("body");
const container = document.querySelector(".container");
const theme = document.querySelector("#theme");
const bgImage = document.querySelector(".bg-image");
const form = document.querySelector("form");
const input = document.querySelector(".new-todo");
const todos = document.querySelector(".todos");
const todoItems = document.querySelectorAll(".todo");
const crosses = document.querySelectorAll(".cross");
const inputCheck = document.querySelector(".bg-input-check");
const disableChecks = document.querySelectorAll(".bg-check");
const todoCount = document.querySelector(".items-left");
const clearComplete = document.querySelector(".clear-complete");
const filterBtns = document.querySelectorAll(".main-footer button");

eventListeners();

/**
 * Events
 */
function eventListeners() {
  document.addEventListener("DOMContentLoaded", loadAllTodos);
  theme.addEventListener("click", changeTheme);
  form.addEventListener("submit", addToDo);
  inputCheck.addEventListener("click", addToDo);
  clearComplete.addEventListener("click", removeCompleted);
  crosses.forEach((cross) => {
    cross.addEventListener("click", removeTodo);
  });
  disableChecks.forEach((disableCheck) => {
    disableCheck.addEventListener("click", disableTodo);
  });
  filterBtns.forEach((filterBtn) => {
    filterBtn.addEventListener("click", filterTodos);
  });
}

/**
 * Loading
 */
function loadAllTodos() {
  let todos = getTodosFromLocalstorage();

  todos.forEach((todo) => {
    addTodoToUI(todo);
  });
}

function getTodosFromLocalstorage() {
  let todos;
  if (!localStorage.getItem("todos")) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

/**
 * Filtering
 */
function filterTodos() {
  const todos = document.querySelectorAll(".todo");
  filterBtns.forEach((filterBtn) => {
    filterBtn.classList.remove("activated");
  });

  if (this.classList.contains("activated")) {
    this.classList.remove("activated");
  } else {
    this.classList.add("activated");
  }

  if (this.textContent === "active") {
    todos.forEach((todo) => {
      todo.classList.contains("disabled")
        ? todo.classList.add("d-none")
        : todo.classList.remove("d-none");
    });
  } else if (this.textContent === "completed") {
    todos.forEach((todo) => {
      todo.classList.contains("disabled")
        ? todo.classList.remove("d-none")
        : todo.classList.add("d-none");
    });
  } else {
    todos.forEach((todo) => {
      todo.classList.remove("d-none");
    });
  }
}

function disableTodo() {
  this.parentNode.classList.toggle("disabled");
  if (this.parentNode.classList.contains("disabled") === true) {
    decreaseTodo();
  } else {
    increaseTodo();
  }
}

/**
 * Removing
 */
function removeCompleted() {
  let todoItems = document.querySelectorAll(".todo");
  todoItems.forEach((todoItem) => {
    if (todoItem.classList.contains("disabled")) {
      removeTodoFromLocalstorage(todoItem.querySelector("p").textContent);
      todoItem.remove();
    }
  });
}

function removeTodoFromLocalstorage(todo) {
  let todos = getTodosFromLocalstorage();
  todos.forEach((localtodo, index) => {
    if (localtodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodo() {
  removeTodoFromLocalstorage(this.parentNode.querySelector("p").textContent);
  this.parentNode.remove();
  if (this.parentNode.classList.contains("disabled") === false) {
    decreaseTodo();
  }
}

/**
 * Adding
 */
function addTodoToUI(newTodo) {
  const checkImg = document.createElement("img");
  checkImg.className = `icon check`;
  checkImg.src = `assets/images/icon-check.svg`;

  const checkBg = document.createElement("div");
  checkBg.className = `icon-bg bg-check d-flex justify-content-center align-items-center`;
  checkBg.appendChild(checkImg);
  checkBg.addEventListener("click", disableTodo);

  const todoText = document.createElement("p");
  todoText.textContent = newTodo;

  const crossImg = document.createElement("img");
  crossImg.src = `assets/images/icon-cross.svg`;
  crossImg.className = `icon cross`;
  crossImg.addEventListener("click", removeTodo);

  const todo = document.createElement("div");
  todo.className = `col col-12 box todo d-flex justify-content-between align-items-center`;

  todo.append(checkBg, todoText, crossImg);
  todos.prepend(todo);
  increaseTodo();
  input.value = "";
}

function addTodosToLocalstorage(newTodo) {
  let todos = getTodosFromLocalstorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addToDo(e) {
  e.preventDefault();
  const newTodo = input.value.trim();
  let todos = getTodosFromLocalstorage();
  if (!newTodo) {
    alert("Empty value!");
    return;
  } else if (todos.includes(newTodo)) {
    alert("Todo already added!");
  } else {
    addTodoToUI(newTodo);
    addTodosToLocalstorage(newTodo);
  }
}

/**
 * Counting
 */
function increaseTodo() {
  let count = Number(todoCount.textContent);
  todoCount.textContent = ++count;
}

function decreaseTodo() {
  let count = Number(todoCount.textContent);
  todoCount.textContent = --count;
}

/**
 * Theme
 */
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
