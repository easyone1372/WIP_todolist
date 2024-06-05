//todoFunction.js

//todoList 추가, 체크, 개수 세기 함수들
const inputText = document.querySelector(".inputText");
const floatingBtn = document.querySelector(".floatingBtn");
const listAmount = document.querySelector(".listAmount");
const completeAmount = document.querySelector(".completeAmount");

export const list = [];
export const checkList = [];

//todo list 추가 함수
export const enterEvent = (event) => {
  const isEnterEvent = event.key === "Enter";
  if (isEnterEvent) addList();
};

//플로팅 버튼 클릭해서 todolist 추가하기
export const clickAddEvent = () => {
  floatingBtn.addEventListener("click", addList);
};

//엔터키를 눌렀다 떼면 enterEvent 발생
inputText.addEventListener("keyup", enterEvent);

//todolist 추가 함수
export const addList = () => {
  const text = inputText.value.trim();
  if (text === "") return;

  const todoText = document.createElement("span");
  todoText.classList.add("todoText");
  todoText.innerText = text;

  const listTextBox = document.createElement("li");
  // listTextBox.classList.remove("none");
  listTextBox.classList.add("listTextBox", "unChecked");
  listTextBox.appendChild(todoText);
  listTextBox.insertAdjacentHTML(
    "beforeend",
    `<span class="listCheck">
  <i class="fa-regular fa-circle-check"></i>
</span>`
  );

  const listViewBox = document.querySelector(".listViewBox");
  listViewBox.appendChild(listTextBox);

  //리스트에 집어넣기
  list.push(text);

  //데이터 초기화
  inputText.value = "";

  todoAllCount();
};

export const todoAllCount = () => {
  listAmount.innerText = list.length;
};

//화면 재구성 함수
export const renderList = (list, listViewBox) => {
  listViewBox.innerHtml = "";

  list.forEach((text) => {
    const todoText = document.createElement("span");
    todoText.classList.add("todoText");
    todoText.innerText = text;

    const listTextBox = document.createElement("li");
    listTextBox.classList.add("listTextBox", "unChecked");
    listTextBox.appendChild(todoText);
    listTextBox.insertAdjacentHTML(
      "beforeend",
      `<span class="listCheck">
    <i class="fa-regular fa-circle-check"></i>
  </span>`
    );

    listViewBox.appendChild(listTextBox);
  });
};

//check버튼 클릭시 해당 리스트 checked 전환
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-circle-check")) {
    const checkBtn = event.target;
    const listItem = checkBtn.closest("li");

    listItem.classList.toggle("unChecked");
    listItem.classList.toggle("checked");

    const isChecked = listItem.classList.contains("checked");
    isChecked
      ? checkList.push(listItem)
      : checkList.splice(checkList.indexOf(listItem), 1);
    completeCount();
  }
});

//리스트를 더블클릭하면 삭제됨
document.addEventListener("dblclick", (event) => {
  if (event.target.classList.contains("todoText")) {
    const doubleBtn = event.target;
    const listItem = doubleBtn.closest("li");

    listItem.remove();
    list.splice(list.indexOf(listItem), 1);

    const isChecked = listItem.classList.contains("checked");
    if (isChecked) checkList.splice(checkList.indexOf(listItem), 1);

    todoAllCount();
    completeCount();
  }
});

export const completeCount = () => {
  completeAmount.innerText = checkList.length;
};

clickAddEvent();
