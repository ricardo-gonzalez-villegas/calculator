let totalDisaply = document.getElementById("total-display");
let historyDisplay = document.getElementById("history-display");
let previousOperator = "";
let currentOperator = "";
let currentValue;
let currentTotal = 0;

function toInt(str) {
  return str * 1;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {}

function setValue(number) {
  currentValue = !currentValue ? number : currentValue + number;
  totalDisaply.innerHTML = currentValue;
  return number;
}

function clearEverything() {
  totalDisaply.innerHTML = 0;
  historyDisplay.innerHTML = "";
  currentTotal = 0;
  currentValue = 0;
}

const numeralButtons = document.querySelectorAll(".numeral");

numeralButtons.forEach(button => {
  button.addEventListener("click", event => {
    setValue(event.target.dataset.value);
  });
});
