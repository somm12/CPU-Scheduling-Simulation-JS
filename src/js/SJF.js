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
const printWorkingLoad = (start, process) => {
  const lastMaxColumnLength = rowList[0].getElementsByTagName("th").length - 1;
  if (lastMaxColumnLength - 1 < start + process.runningTime - 1) {
    // 부족한 열 추가하기.

    for (let i = 0; i < rowList.length; i++) {
      // 각 시간대, 각 프로세스 행에서 추가적인 열을 만들기.
      for (
        let j = 0;
        j < start + process.runningTime - lastMaxColumnLength;
        j++
      ) {
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

  for (let i = start; i < start + process.runningTime; i++) {
    // 맨 처음은 모두 프롤세스 이름을 나타내므로 i+1 해야함.
    rowList[process.index].getElementsByTagName("td")[i + 1].innerText = "🍀";
  }
};
//2. 현재 시점에서 도착한 프로세스들 중 가장 실행시간이 적은 프로세스 선택.
const sjf = (queue) => {
  let num = queue.length;
  let now = 0;
  const possible = [];
  const visited = new Set();

  while (num > 0) {
    for (let i = 0; i < queue.length; i++) {
      if (now >= queue[i][1] && !visited.has(queue[i][0])) {
        visited.add(queue[i][0]);
        possible.push(queue[i]);
      }
    }
    if (possible.length > 0) {
      possible.sort((a, b) => a[2] - b[2]); // running time이 적은순.
      let process = possible.shift();
      process = {
        index: process[0],
        arriveTime: process[1],
        runningTime: process[2],
      };
      printWorkingLoad(now, process);
      now += process.runningTime;
      num -= 1;
    } else now += 1;
  }
};
// 1. 도착 순서대로 정렬
const intialSetting = () => {
  const arr = [];
  for (let tmp of timetable) {
    arr.push([tmp.id, parseInt(tmp.at), parseInt(tmp.rt)]);
  }
  arr.sort((a, b) => {
    return a[1] - b[1];
  });

  initialPrinting();
  sjf(arr);
};
intialSetting();
