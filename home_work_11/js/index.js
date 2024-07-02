"use strict";

const taskInput = document.querySelector(".task-input");
const tasksList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const form = document.querySelector(".create-task-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (taskInput.value.trim() === "") {
    taskInput.value = "";
    return;
  }

  const taskId = Date.now().toString();
  createSingleTaskElement(taskInput.value, taskId);
  storeTaskInLocalStorage(taskInput.value, taskId);

  taskInput.value = "";
});

document.addEventListener("DOMContentLoaded", () => {
  const tasks = localStorage.getItem("tasks") !== null ? JSON.parse(localStorage.getItem("tasks")) : [];

  tasks.forEach((task) => {
    createSingleTaskElement(task.text, task.id);
  });
});

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure?")) {
    localStorage.clear();
    tasksList.innerHTML = "";
  }
});

tasksList.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-remove")) {
    const taskElement = event.target.parentElement.parentElement;
    const taskId = taskElement.dataset.id;

    taskElement.remove();
    removeTaskFromLocalStorage(taskId);
  } else if (event.target.classList.contains("fa-edit")) {
    const taskElement = event.target.parentElement.parentElement;
    const taskId = taskElement.dataset.id;
    const newText = prompt("Edit task:", taskElement.firstChild.textContent);

    if (newText !== null && newText.trim() !== "") {
      taskElement.firstChild.textContent = newText;
      updateTaskInLocalStorage(taskId, newText);
    }
  }
});

function createSingleTaskElement(taskInput, taskId) {
  const li = document.createElement("li");
  li.className = "collection-item";
  li.dataset.id = taskId;

  li.appendChild(document.createTextNode(taskInput));

  const editElement = document.createElement("span");
  editElement.className = "edit-item";
  editElement.innerHTML = '<i class="fa fa-edit"></i>';

  const deleteElement = document.createElement("span");
  deleteElement.className = "delete-item";
  deleteElement.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(editElement);
  li.appendChild(deleteElement);

  tasksList.appendChild(li);
}

function storeTaskInLocalStorage(task, taskId) {
  const tasks = localStorage.getItem("tasks") !== null ? JSON.parse(localStorage.getItem("tasks")) : [];

  tasks.push({ text: task, id: taskId });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskId) {
  let tasks = localStorage.getItem("tasks") !== null ? JSON.parse(localStorage.getItem("tasks")) : [];

  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskId, newText) {
  const tasks = localStorage.getItem("tasks") !== null ? JSON.parse(localStorage.getItem("tasks")) : [];

  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, text: newText };
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
