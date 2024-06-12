import Queue from "./queue.js";

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
const convertToArray = (queue) => {
  const arr = [];
  while (queue.length > 0) {
    const tmp = queue.dequeue();
    arr.push([tmp.index, tmp.arriveTime, tmp.runningTime]);
  }
  return arr;
};
const convertToQueue = (arr) => {
  const q = new Queue();
  for (const [idx, at, rt] of arr) {
    q.enqueue(idx, at, rt);
  }
  return q;
};
// SRTF (time slice가 1인 방식 + SJF)
const srtf = (queue, timeSlice) => {
  let num = queue.length;
  let now = 0;
  let possible = new Queue();
  const stack = [];

  while (num > 0) {
    while (queue.length > 0 && now >= queue.head.arriveTime) {
      const tmp = queue.dequeue();
      possible.enqueue(tmp.index, tmp.arriveTime, tmp.runningTime);
    }
    if (stack.length > 0) {
      const tmp = stack.pop();
      possible.enqueue(tmp.index, tmp.arriveTime, tmp.runningTime);
    }
    if (possible.length > 0) {
      const tmpQueue = convertToArray(possible);
      tmpQueue.sort((a, b) => {
        if (a[2] !== b[2]) return a[2] - b[2]; // RT가 적은 순.
        return a[1] - b[1]; // AT가 빠른 순.
      });
      possible = convertToQueue(tmpQueue);
      // process.rt 작고, process.at 작은 기준으로 정렬.
      const process = possible.dequeue();

      printWorkingLoad(now, process, timeSlice);
      now += Math.min(process.runningTime, timeSlice);
      if (process.runningTime > timeSlice) {
        process.runningTime -= timeSlice;
        stack.push(process); // 다음에 이어서 다시 실행되어야함.
      } else num -= 1; // 이번에 서비스가 종료가 됨.
      //   now += Math.min(process.runningTime, timeSlice);
    } else now += 1; // 실행 할 수 있는 프로세스가 없다면 시간 + 1.
  }
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

  let queue = new Queue();

  for (const [idx, at, rt] of arr) {
    queue.enqueue(idx, at, rt);
  }
  console.log(queue);
  initialPrinting();
  srtf(queue, 1);
};
intialSetting();
