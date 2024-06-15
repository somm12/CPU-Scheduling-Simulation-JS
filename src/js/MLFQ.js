import Queue from "./queue.js";
import fifo from "./fifoLogic.js";

const TIMETABLE = "TIMETABLE";
const fifoTable = document.querySelector(".fifo-table");
const rowList = fifoTable.getElementsByTagName("tr");
let timetable = localStorage.getItem(TIMETABLE);
timetable = JSON.parse(timetable);

const initialPrinting = () => {
  // 초반에 필요한 테이블 그리기. 프로세스 개수 만큼 행만들기.

  const len = timetable.length;
  const timeMarkingRow = document.createElement("tr");
  const fistRow = document.createElement("th");
  fistRow.innerText = "T";
  timeMarkingRow.appendChild(fistRow);
  fifoTable.appendChild(timeMarkingRow);
  console.log(len);
  for (let i = 0; i < len; i++) {
    const row = document.createElement("tr");
    const firstColumn = document.createElement("td");
    firstColumn.innerText = `P${i}`;
    row.appendChild(firstColumn);
    fifoTable.appendChild(row);
  }
};

const printWorkingLoad = (start, process, timeSlice) => {
  const lastMaxColumnLength = rowList[0].getElementsByTagName("th").length - 1;
  const serviceTime = Math.min(process.runningTime, timeSlice);
  if (lastMaxColumnLength - 1 < start + serviceTime - 1) {
    // 부족한 열 추가하기.

    for (let i = 0; i < rowList.length; i++) {
      // 각 시간대, 각 프로세스 행에서 추가적인 열을 만들기.
      for (let j = 0; j < start + serviceTime - lastMaxColumnLength; j++) {
        if (i == 0) {
          // table head 부분.
          const columnHead = document.createElement("th");
          columnHead.innerText = `${lastMaxColumnLength + j}`;
          rowList[i].appendChild(columnHead);
        } else {
          // table 데이터 부분.
          const columnData = document.createElement("td");
          // columnData.innerText = "1";
          rowList[i].appendChild(columnData);
        }
      }
    }
  }

  for (let i = start; i < start + serviceTime; i++) {
    // 맨 처음은 모두 프로세스 이름을 나타내므로 i+1 해야함.
    rowList[process.index].getElementsByTagName("td")[i + 1].innerText = "🍀";
  }
};

// RR(timeSlice = 1, 2) 방식, FIFO 방식
const rr = (info, timeSlice, now) => {
  let num = info.length;

  const possible = new Queue(); // 지금 실행 가는 프로세스 담기.
  //   const stack = [];
  const nextLevelQueue = new Queue(); // 다음 레벨에서 다시 실행되어야하는 프로세스 담기.
  console.log("무엇?");
  while (num > 0) {
    while (info.length > 0 && now >= info.head.arriveTime) {
      const tmp = info.dequeue();
      possible.enqueue(tmp.index, tmp.arriveTime, tmp.runningTime);
    }
    // if (stack.length > 0) {
    //   const tmp = stack.pop();
    //   possible.enqueue(tmp.index, tmp.arriveTime, tmp.runningTime);
    // }
    if (possible.length > 0) {
      print(now, ":현재 시간!!");
      print(possible, "가능한거.!!!!");
      const process = possible.dequeue();
      console.log(process, "이번에 할 프로세스.");

      printWorkingLoad(now, process, timeSlice);
      now += Math.min(process.runningTime, timeSlice);
      num -= 1;
      if (process.runningTime > timeSlice) {
        process.runningTime -= timeSlice;
        nextLevelQueue.enqueue(
          process.index,
          process.arriveTime,
          process.runningTime
        );
        console.log(nextLevelQueue, "다음에 해야할거.");
        // 다음 레벨의 큐에서 다시 실행되어야함.
      }
      //   now += Math.min(process.runningTime, timeSlice);
    } else now += 1; // 실행 할 수 있는 프로세스가 없다면 시간 + 1.
  }
  return [nextLevelQueue, now];
};
// 1. 도착 순서대로 정렬
const intialSetting = () => {
  const arr = [];
  console.log(timetable);
  for (let tmp of timetable) {
    arr.push([tmp.id, parseInt(tmp.at), parseInt(tmp.rt)]);
  }
  arr.sort((a, b) => {
    return a[1] - b[1];
  });

  const info = new Queue();

  for (const [idx, at, rt] of arr) {
    info.enqueue(idx, at, rt);
  }
  console.log(info);
  initialPrinting();
  // 처음엔 timeSlice = 1 인 큐를 사용.
  const [queue2, nowTime2] = rr(info, 1, 0);

  // 다음으로 timeSlice = 2 인 큐를 사용.
  const [queue3, nowTime3] = rr(queue2, 2, nowTime2);

  //   // 마지막으로 FIFO로 마무리.
  fifo(queue3, nowTime3);
};
intialSetting();
