const TIMETABLE = "TIMETABLE";
let timetable = localStorage.getItem(TIMETABLE);
timetable = JSON.parse(timetable);
console.log(timetable);
let queue = [];
for (let arr of timetable) {
  queue.push([arr.id, parseInt(arr.at), parseInt(arr.rt)]);
}
queue.sort((a, b) => {
  return a[1] - b[1];
});
console.log(queue);

for (let process of queue) {
  const [id, arrivedTime, runningTime] = process;
  let stick = "";
  for (let i = arrivedTime; i < arrivedTime + runningTime; i++) {
    stick += "🌈";
  }
  console.log(stick); // 표에서 프로세스 해당 위치에 출력 예정.
}
