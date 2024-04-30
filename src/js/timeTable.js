const addButton = document.querySelector(".addBtn");
const removeButton = document.querySelector(".removeBtn");
const submitButton = document.querySelector(".submitBtn");
const arrivedTime = document.querySelector(".arrived-time");
const runningTime = document.querySelector(".running-time");

let timeTable = [];

const TIMETABLE = "TIMETABLE";
addButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (timeTable.length >= 5) {
    alert("5개 까지만 입력해주세요!"); // 5개 까지만 입력 제한
    event.preventDefault();
  } else if (arrivedTime.value && runningTime.value) addRow(event);
});
submitButton.addEventListener("click", submitTable);

function submitTable() {
  // 다음 화면으로 넘어가자.
  // let table = document.querySelector(".tableBody");
  // const tableChildren = table.children;
  // console.log(tableChildren);
}

function saveTimeTable() {
  localStorage.setItem(TIMETABLE, JSON.stringify(timeTable));
}

function editRow(event) {
  const row = event.target.parentElement.parentElement;
  const children = row.childNodes;
  let [arrivedTime, runningTime] = [0, 0];
  const editBtn = children[3].childNodes[0];

  for (let i = 0; i < 2; i++) {
    if (children[i].childNodes[0].value < 0) {
      window.alert("0이상의 정수를 입력해주세요!");
      event.preventDefault();
      return;
    }
  }

  // 수정 할 수 있도록 풀어주기 Or 다시 클릭하면 고칠 수 없도록 만들기.
  for (let i = 0; i < 2; i++) {
    children[i].childNodes[0].classList.toggle("inputDisabled");
  }
  // 수정 버튼 글자, 완료 글자.
  if (editBtn.innerText === "✏️") {
    editBtn.innerText = "✅";
  } else {
    editBtn.innerText = "✏️";
  }

  for (let i = 0; i < 2; i++) {
    if (i == 0) arrivedTime = children[i].childNodes[0].value;
    else runningTime = children[i].childNodes[0].value;
  }

  timeTable.map((process) => {
    console.log(process, row.id);
    if (process.id == row.id) {
      process.at = arrivedTime;
      process.rt = runningTime;
    }
  });
  console.log(timeTable);

  saveTimeTable();
}
function removeRow(event) {
  const row = event.target.parentElement.parentElement;

  row.parentNode.removeChild(row);
  console.log(row);
  timeTable = timeTable.filter((process) => process.id !== parseInt(row.id));
  saveTimeTable();
}
function addRow(event) {
  // Get the table body element in which you want to add row
  if (arrivedTime.value < 0 || runningTime.value < 0) {
    window.alert("0이상의 정수를 입력해주세요!");
    event.preventDefault();
    return;
  }
  let table = document.querySelector(".tableBody");

  // Create row element
  let row = document.createElement("tr");
  row.id = timeTable.length + 1;

  // Create cells
  let arrivedTimeColumn = document.createElement("td");
  let runningTimeColumn = document.createElement("td");
  let removeBtnColumn = document.createElement("td");
  let editBtnColumn = document.createElement("td");

  // Insert data to cells
  let arrivedTimeInput = document.createElement("input");
  arrivedTimeInput.value = arrivedTime.value;
  arrivedTimeInput.type = "number";
  arrivedTimeInput.className = "inputDisabled";
  // runningTime
  let runningTimeInput = document.createElement("input");
  runningTimeInput.value = runningTime.value;
  runningTimeInput.type = "number";
  runningTimeInput.className = "inputDisabled";
  let removeBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  // 삭제 버튼
  removeBtn.innerText = "❌";
  removeBtn.className = "removeBtn";
  removeBtn.addEventListener("click", removeRow);

  //수정 버튼 ----
  editBtn.innerText = "✏️";
  editBtn.className = "editBtn";
  editBtn.addEventListener("click", editRow);

  arrivedTimeColumn.appendChild(arrivedTimeInput);
  runningTimeColumn.appendChild(runningTimeInput);
  removeBtnColumn.appendChild(removeBtn);
  editBtnColumn.appendChild(editBtn);

  // Append cells to row
  row.appendChild(arrivedTimeColumn);
  row.appendChild(runningTimeColumn);
  row.appendChild(removeBtnColumn);
  row.appendChild(editBtnColumn);
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
