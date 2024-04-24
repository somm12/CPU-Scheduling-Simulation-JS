const addButton = document.querySelector(".addBtn");
const removeButton = document.querySelector(".removeBtn");

addButton.addEventListener("click", addRow);

function removeRow(event) {
  const row = event.target.parentElement.parentElement;

  row.parentNode.removeChild(row);
}
function addRow() {
  // Get the table body element in which you want to add row
  let table = document.querySelector(".tableBody");

  // Create row element
  let row = document.createElement("tr");
  row.id = Date.now();

  // Create cells
  let arrivedTimeColumn = document.createElement("td");
  let runningTimeColumn = document.createElement("td");
  let removeBtnColumn = document.createElement("td");

  // Insert data to cells
  let arrivedTimeInput = document.createElement("input");
  let runningTimeInput = document.createElement("input");
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
}
