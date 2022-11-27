const refs = {
  inputEl: document.querySelector(".todo-input"),
  buttonEl: document.querySelector(".todo-button"),
  listEl: document.querySelector(".todo-list"),
  formEl: document.querySelector("form"),
  sortEl: document.querySelector(".filter-todo"),
};

refs.formEl.addEventListener("submit", addToDoItem);
refs.listEl.addEventListener("click", removeToDoItem);
refs.listEl.addEventListener("click", checkToDoItem);
refs.sortEl.addEventListener("change", sortToDoItem);

let ALL_TODOS;

function addToDoItem(e) {
  e.preventDefault();
  const inputText = e.currentTarget.elements.inputValue.value;
  if (inputText === "") {
    return alert("You need to type something");
  }
  const markup = `<div class="todo">
  <li class="todo-item">${inputText}</li>
  <button class="complete-btn"><i class="fa-solid fa-check"></i></button>
  <button class="trash-btn"><i class="fa-solid fa-trash"></i></button>
</div>`;
  refs.listEl.insertAdjacentHTML("beforeend", markup);
  refs.inputEl.value = "";
}

function removeToDoItem(e) {
  if (e.target.classList[0] === "trash-btn") {
    e.target.closest("div").classList.add("fall");
    e.target.closest("div").addEventListener("transitionend", () => {
      e.target.closest("div").remove();
    });
  }
}

function checkToDoItem(e) {
  if (e.target.classList[0] === "complete-btn") {
    e.target.closest("div").classList.toggle("completed");
    console.log(e.target.closest("div").textContent);
  }
}

function sortToDoItem(e) {
  const todos = refs.listEl.childNodes;

  todos.forEach((el) => {
    switch (e.target.value) {
      case "all":
        el.style.display = "flex";
        break;
      case "completed":
        if (el.classList.contains("completed")) {
          el.style.display = "flex";
        } else {
          el.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!el.classList.contains("completed")) {
          el.style.display = "flex";
        } else {
          el.style.display = "none";
        }
        break;
    }
  });
}

/* next step is to add LocalStorage functionality, make sure that "completed" tasks are saved after refreshing the page as "completed" (make two arr which will separatly save ALL and COMPLETED)*/

/* change style of TDL, find some nice desighn, make it functionaly and uiux friendly*/

// ! use quote API to motivate user
// ? maybe add local weather API
// ? add a
