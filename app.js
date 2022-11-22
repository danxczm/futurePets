const refs = {
  inputEl: document.querySelector(".todo-input"),
  buttonEl: document.querySelector(".todo-button"),
  listEl: document.querySelector(".todo-list"),
  formEl: document.querySelector("form"),
  sortEl: document.querySelector(".filter-todo"),
  // sortEl: (document.querySelector(".filter-todo").onchange = sortToDoItem),
};

refs.formEl.addEventListener("submit", addToDoItem);
refs.listEl.addEventListener("click", removeToDoItem);
refs.listEl.addEventListener("click", checkToDoItem);
refs.sortEl.addEventListener("change", sortToDoItem);

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
  }
}

function sortToDoItem(e) {
  const todos = refs.listEl.childNodes;
  // var selectedValue = refs.sortEl.options[refs.sortEl.selectedIndex].value;
  // console.log(selectedValue);

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
