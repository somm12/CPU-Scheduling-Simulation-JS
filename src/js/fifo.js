import { Queue } from "./queue.js";
const TIMETABLE = "TIMETABLE";
let timetable = localStorage.getItem(TIMETABLE);
timetable = JSON.parse(timetable);
console.log(timetable);

const printWorkingLoad = (start, process) => {
  // process.index 번째의 행 프로세스에서,
  // start 번째 열 부터 ~ start + process.runningTime까지
  // innerText채우기.
  // 만약 아직 해당 열이 만들어지지 않았다면,
  // 마지막으로 만들어진 열(x번째) ~ process.runningTime까지
  // 새로 th,td생성
  //th: 시간 대를 나타내는 부분
  // td: 열을 나타내는 부분.
};
//2. 큐에 들어온 순서대로 FIFO 방식으로 스케줄링 시작.
const fifo = (queue) => {
  let now = 0; //현재 시간
  while (queue.length > 0) {
    const process = queue.front(); // 지금 가장 먼저 들어온 프로세스
    if (now >= process.arriveTime) {
      // 현재 시간 이하로 들어왔다면, 실행 가능. (미래는 아직 불가.)
      queue.dequeue(); // 큐에서 빠지기.
      printWorkingLoad(now, process); // 현재 프로세스 출력.
    } else now += 1; // 아직 가장 먼저 들어온 프로세스도 실행하기 전이라면, 시간 + 1.
  }
};
// 1. 도착 순서대로 정렬 후, 큐로 셋팅
const intialSetting = () => {
  const arr = [];
  for (let tmp of timetable) {
    arr.push([tmp.id, parseInt(tmp.at), parseInt(tmp.rt)]);
  }
  arr.sort((a, b) => {
    return a[1] - [1];
  });
  const queue = new Queue();
  for (const [idx, at, rt] of arr) {
    queue.enqueue(idx, at, rt);
  }
  fifo(queue);
};
