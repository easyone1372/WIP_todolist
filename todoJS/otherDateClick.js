//otherDateClick.js

let todayList = [];
let todayCompleteList = [];

//오늘의 todolist를 저장하는 함수
export const saveTodayList = (list, checkList) => {
  if (todayList.length === 0 && todayCompleteList.length === 0) {
    list.forEach((data) => todayList.push(data));
    checkList.forEach((data) => todayCompleteList.push(data));
  }
};

//저장한 오늘의 todolist를 불러와 집어넣는 함수
// export const showTodayList = (list, checkList) => {
//   const date = new Date();
//   //console.log("출력됨"); 여기는 작동함
//   /*
//   여기도 출력됨
//   console.log(list);
//   console.log(checkList);
//   */
//   const dateNumBox = document.querySelector(".dateNumBox");
//   const isToday = dateNumBox.classList.contains("today");

//   if (isToday) {
//     console.log(list);
//     console.log(checkList);
//     todayList.forEach((data) => list.push(data));
//     todayCompleteList.forEach((data) => checkList.push(data));
//     console.log("여기도 됨"); //여기 작동안함
//   }
// };

export const showTodayList = (list, checkList) => {
  if (todayList.length !== 0 && todayCompleteList.length !== 0) {
    todayList.forEach((data) => list.push(data));
    todayCompleteList.forEach((data) => checkList.push(data));
  }
};
