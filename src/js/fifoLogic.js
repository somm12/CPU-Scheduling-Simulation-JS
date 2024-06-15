import Queue from "./queue.js";

const TIMETABLE = "TIMETABLE";
const fifoTable = document.querySelector(".fifo-table");
const rowList = fifoTable.getElementsByTagName("tr");
let timetable = localStorage.getItem(TIMETABLE);
timetable = JSON.parse(timetable);
const printWorkingLoad = (start, process) => {
  // process.index 번째의 행 프로세스에서,
  // start 번째 열 부터 ~ start + process.runningTime까지
  // innerText채우기.
  // 만약 아직 해당 열이 만들어지지 않았다면,
  // 마지막으로 만들어진 열(x번째) ~ process.runningTime까지
  // 새로 th,td생성
  //th: 시간 대를 나타내는 부분
  // td: 열을 나타내는 부분.

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
//2. 큐에 들어온 순서대로 FIFO 방식으로 스케줄링 시작.
const fifo = (queue, now) => {
  while (queue.length > 0) {
    const process = queue.front(); // 지금 가장 먼저 들어온 프로세스

    if (now >= process.arriveTime) {
      // 현재 시간 이하로 들어왔다면, 실행 가능. (미래는 아직 불가.)
      queue.dequeue(); // 큐에서 빠지기.
      printWorkingLoad(now, process); // 현재 프로세스 출력.
      now += process.runningTime;
    } else now += 1; // 아직 가장 먼저 들어온 프로세스도 실행하기 전이라면, 시간 + 1.
  }
};

export default fifo;
