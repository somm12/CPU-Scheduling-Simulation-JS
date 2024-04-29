const addButton = document.querySelector(".addBtn");
const removeButton = document.querySelector(".removeBtn");
const submitButton = document.querySelector(".submitBtn");
const arrivedTime = document.querySelector(".arrived-time");
const runningTime = document.querySelector(".running-time");

let timeTable = [];
const TIMETABLE = "TIMETABLE";
addButton.addEventListener("click", (event) => {
  if (timeTable.length >= 5) {
    alert("5개 까지만 입력해주세요!"); // 5개 까지만 입력 제한
    event.preventDefault();
  }
  if (arrivedTime.value && runningTime.value) addRow();
});
submitButton.addEventListener("click", submitTable);

function submitTable() {
  // 다음 화면으로 넘어가자.
}

function saveTimeTable() {
  localStorage.setItem(TIMETABLE, JSON.stringify(timeTable));
}

function removeRow(event) {
  const row = event.target.parentElement.parentElement;

  row.parentNode.removeChild(row);
  console.log(row);
  timeTable = timeTable.filter((process) => process.id !== parseInt(row.id));
  saveTimeTable();
}
function addRow() {
  // Get the table body element in which you want to add row

  let table = document.querySelector(".tableBody");

  // Create row element
  let row = document.createElement("tr");
  row.id = timeTable.length + 1;

  // Create cells
  let arrivedTimeColumn = document.createElement("td");
  let runningTimeColumn = document.createElement("td");
  let removeBtnColumn = document.createElement("td");

  // Insert data to cells
  let arrivedTimeInput = document.createElement("input");
  arrivedTimeInput.value = arrivedTime.value;
  let runningTimeInput = document.createElement("input");
  runningTimeInput.value = runningTime.value;
  let removeBtn = document.createElement("button");

  removeBtn.innerText = "-";
  removeBtn.className = "removeBtn";
  removeBtn.addEventListener("click", removeRow);

  arrivedTimeColumn.appendChild(arrivedTimeInput);
  runningTimeColumn.appendChild(runningTimeInput);
  removeBtnColumn.appendChild(removeBtn);

  // Append cells to row
  row.appendChild(arrivedTimeColumn);
  row.appendChild(runningTimeColumn);
  row.appendChild(removeBtnColumn);
  // Append row to table body

  table.appendChild(row);

  // timeTable 배열에 추가하기
  const newId = timeTable.length + 1;
  const newProcess = {
    id: newId,
    at: arrivedTime.value,
    rt: runningTime.value,
  };
  timeTable.push(newProcess);
  saveTimeTable();

  arrivedTime.value = "";
  runningTime.value = "";
}

// function init() {
//   localStorage.clear();
// }

// init();
