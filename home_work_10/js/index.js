"use strict";

const elWrapper = document.createElement("div");
document.body.append(elWrapper);
elWrapper.className = "container";

const elBtn = document.createElement("button");
elWrapper.append(elBtn);
elBtn.className = "button";
elBtn.innerText = "Turn off";

let lastText = "";

function getBackground() {
  const now = new Date();
  const formattedDate = formatDate(now);
  if (elBtn.innerText === "Turn off") {
    elWrapper.classList.add("bg-000");
    elWrapper.classList.remove("bg-fff");
    elBtn.innerText = "Turn on";
    lastText = `Last turn off ${formattedDate}`;
    localStorage.setItem("state", "Turn on");
  } else if (elBtn.innerText === "Turn on") {
    elWrapper.classList.add("bg-fff");
    elWrapper.classList.remove("bg-000");
    elBtn.innerText = "Turn off";
    lastText = `Last turn on ${formattedDate}`;
    localStorage.setItem("state", "Turn off");
  }

  localStorage.setItem("lastText", lastText);
  updateMessage();
}

function updateMessage() {
  const existingP = elWrapper.querySelector(".text");
  if (existingP) {
    existingP.remove();
  }
  const elp = document.createElement("p");
  elp.className = "text";
  elp.innerText = localStorage.getItem("lastText");
  elWrapper.append(elp);
}
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}
function initializeState() {
  const savedState = localStorage.getItem("state");
  const savedText = localStorage.getItem("lastText");

  if (savedState) {
    elBtn.innerText = savedState;
    if (savedState === "Turn on") {
      elWrapper.classList.add("bg-000");
      elWrapper.classList.remove("bg-fff");
    } else {
      elWrapper.classList.add("bg-fff");
      elWrapper.classList.remove("bg-000");
    }
  } else {
    elBtn.innerText = "Turn off";
    elWrapper.classList.add("bg-fff");
  }

  if (savedText) {
    lastText = savedText;
    updateMessage();
  }
}
window.onload = function () {
  initializeState();
  elBtn.addEventListener("click", getBackground);
};
