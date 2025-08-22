let income = 0;
let expense = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addBtn").addEventListener("click", addTransaction);
});

function addTransaction() {
  const amountInput = document.getElementById("amount");
  const typeInput = document.getElementById("type");
  const dateInput = document.getElementById("date");

  const amount = parseFloat(amountInput.value);
  const type = typeInput.value.trim().toLowerCase();
  const date = dateInput.value;

  if (!amount || !type || !date) {
    alert("Please fill out all fields.");
    return;
  }

  const tbody = document.getElementById("transactions");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>₹${amount}</td>
    <td>${type}</td>
    <td>${date}</td>
    <td><button onclick="deleteTransaction(this, ${amount}, '${type}')">❌</button></td>
  `;

  tbody.appendChild(row);

  // Update totals
  if (type === "income") {
    income += amount;
  } else if (type === "expense") {
    expense += amount;
  } else {
    alert("Type must be 'Income' or 'Expense'");
    tbody.removeChild(row);
    return;
  }

  updateSummary();

  // Clear input fields
  amountInput.value = "";
  typeInput.value = "";
  dateInput.value = "";
}

function deleteTransaction(button, amount, type) {
  const row = button.parentElement.parentElement;
  row.remove();

  // Adjust totals
  if (type === "income") {
    income -= amount;
  } else if (type === "expense") {
    expense -= amount;
  }

  updateSummary();
}

function updateSummary() {
  document.getElementById("income").innerText = `₹${income}`;
  document.getElementById("expense").innerText = `₹${expense}`;
  document.getElementById("balance").innerText = `₹${income - expense}`;

  }



