//date.js
import { saveTodayList, showTodayList } from "./otherDateClick.js";
import { renderList } from "./todoFunction.js";

import { list, checkList } from "./todoFunction.js";
/*
  다른 날짜 선택시 list창 초기화
*/

const dateYoilList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dateList = [];
const dayofWeekList = [];
const dateofWeekList = [];
//날짜 클릭을 위한 변수
let currentSelectedDateElement = null;
//

//한달 첫날과 막일 계산
const today = new Date();
const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

// console.log(typeof todayDate); //Number
// console.log(startDate, endDate);

//한달 날짜 모두 받아오기
const getDateAmount = (startDate, endDate) => {
  while (startDate <= endDate) {
    // dateList.push(startDate.toDateString());
    dateList.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  //   return console.log(dateList);
};

getDateAmount(startDate, endDate);

//한달 요일 받아와서 list에 집어넣기
dateList.forEach((date) => {
  const dayofWeek = date.getDay();
  const dayofWeekString = dateYoilList[dayofWeek];
  //   console.log(`${date.toDateString()},${dayofWeekString}`);
  dayofWeekList.push(dayofWeekString);
});

dateList.forEach((date) => {
  const dateofWeek = date.getDate();
  dateofWeekList.push(dateofWeek);
});

//요일 대입해서 출력하기
export const addDate = () => {
  const todayDate = today.getDate();

  dayofWeekList.forEach((date) => {
    const dateYoilbox = document.createElement("span");
    const dateBox = document.createElement("div");

    dateYoilbox.innerText = date;

    dateYoilbox.classList.add("dateYoilBox");
    dateBox.classList.add("dateBox");

    const dateScrollBox = document.querySelector(".dateScrollBox");
    dateBox.appendChild(dateYoilbox);
    dateScrollBox.appendChild(dateBox);
  });

  dateofWeekList.forEach((date) => {
    const dateNumBox = document.createElement("div");
    dateNumBox.innerText = date;
    dateNumBox.classList.add("dateNumBox");

    if (Number(date) === todayDate) {
      dateNumBox.classList.add("today");
    }
    const dateBox = document.querySelector(".dateBox");
    dateBox.appendChild(dateNumBox);
    const dateScrollBox = document.querySelector(".dateScrollBox");
    dateScrollBox.appendChild(dateBox);
  });
};

//날짜 클릭 이벤트
export const handelDateclick = () => {
  document.addEventListener("click", (event) => {
    //날짜를 클릭했을 때 가까운 dateNumBox추적
    if (event.target.classList.contains("dateNumBox")) {
      const dateBtn = event.target;
      const listViewbox = document.querySelector(".listViewBox");

      const isToday = dateBtn.classList.contains("today");
      //만약 오늘이 아닌 다른 날짜를 클릭했다면
      if (!isToday) {
        //오늘의 todolist를 저장하고 박스를 초기화
        saveTodayList(list, checkList);
        listViewbox.innerHTML = "";
      } else {
        //오늘이라면 오늘의 todolist를 불러와 출력

        const isTodayClick =
          currentSelectedDateElement.innerText === dateBtn.innerText;
        if (!isTodayClick) {
          showTodayList(list, checkList);
          renderList(list, listViewbox);
        }
      }

      //오늘의 날짜가 아닌 다른 날짜를 선택하고 또다른 날짜를 선택했을때 중복선택을 막는 기능
      if (
        currentSelectedDateElement &&
        currentSelectedDateElement !== dateBtn
      ) {
        currentSelectedDateElement.classList.remove("clickDate");
      }

      dateBtn.classList.toggle("clickDate");
      currentSelectedDateElement = dateBtn;

      const todayDate = today.getDate();
      const clickedDate = parseInt(dateBtn.innerText);

      //오늘 날짜와 클릭한 날짜가 동일하다면 clickDate 클래스 제거
      if (clickedDate === todayDate) {
        dateBtn.classList.remove("clickDate");
      }
    }
  });
};
