"use strict";
let totalDisaply = document.getElementById("total-display");
let historyDisplay = document.getElementById("history-display");
let operator = "";
let currentInteger;
let previousInteger;
let currentTotal;
let history = "";
let display = true;

function equals() {
  chooseOperation(operator);
}

function toInt(str) {
  return str * 1;
}

function add() {
  if (currentInteger.length !== 0) {
    typeof currentTotal !== "undefined"
      ? (currentTotal += toInt(currentInteger))
      : (currentTotal = toInt(previousInteger) + toInt(currentInteger));
  } else if (currentInteger.length === 0) {
    currentTotal += previousInteger;
    currentInteger = "";
  }
  console.log(currentTotal);
  setDisplay();
  return currentTotal;
}

function subtract() {
  if (currentInteger.length !== 0) {
    typeof currentTotal !== "undefined"
      ? (currentTotal -= toInt(currentInteger))
      : (currentTotal = toInt(previousInteger) - toInt(currentInteger));
  } else if (currentInteger.length === 0) {
    currentTotal -= previousInteger;
  }
  console.log(currentTotal);
  setDisplay();
  return currentTotal;
}

function divide() {
  if (currentInteger.length !== 0) {
    typeof currentTotal !== "undefined"
      ? (currentTotal /= toInt(currentInteger))
      : (currentTotal = toInt(previousInteger) / toInt(currentInteger));
  } else if (currentInteger.length === 0) {
    currentTotal /= previousInteger;
  }
  console.log(currentTotal);
  setDisplay();
  return currentTotal;
}

function multiply() {
  if (currentInteger.length !== 0) {
    typeof currentTotal !== "undefined"
      ? (currentTotal *= toInt(currentInteger))
      : (currentTotal = toInt(previousInteger) * toInt(currentInteger));
  } else if (currentInteger.length === 0) {
    currentTotal *= previousInteger;
  }
  console.log(currentTotal);
  setDisplay();
  return currentTotal;
}

function saveIntergers() {
  previousInteger = currentInteger;
  currentTotal = currentInteger;
  currentInteger = 0;
  setHistory();
}

function setInterger(interger) {
  if (interger == 0 && !currentInteger) {
    return;
  }
  currentInteger = !currentInteger ? interger : currentInteger + interger;
  totalDisaply.innerHTML = currentInteger;
  console.log(currentInteger);
}

function setDisplay() {
  totalDisaply.innerHTML =
    Math.round((currentTotal + Number.EPSILON) * 100) / 100;
}

function clearEverything() {
  location.reload();
}

function clearInterger(){
  currentInteger = '';
  totalDisaply.innerHTML = 0;
}

function backspace() {
  if (currentInteger.length === 1) {
    totalDisaply.innerHTML =
      Math.round((currentTotal + Number.EPSILON) * 100) / 100;
  } else {
    currentInteger = currentInteger.substring(0, currentInteger.length - 1);
    currentInteger.length === 0
      ? (totalDisaply.innerHTML = 0)
      : (totalDisaply.innerHTML = currentInteger);
  }
}

function setHistory() {
  history += previousInteger + " " + operator + " ";
  historyDisplay.innerHTML = history;
}

const numeralButtons = document.querySelectorAll(".numeral");

numeralButtons.forEach(button => {
  button.addEventListener("click", event => {
    setInterger(event.target.dataset.value);
  });
});

const nonNumeralButtons = document.querySelectorAll(".operator");

nonNumeralButtons.forEach(button => {
  button.addEventListener("click", event => {
    console.log(event.target.dataset.value);
    operator = event.target.dataset.value;
    if (!currentTotal) {
      previousInteger = currentInteger;
    } else {
      previousInteger = currentTotal;
    }
    currentInteger = "";
  });
});

function chooseOperation(operator) {
  switch (operator) {
    case "+":
      console.log("add");
      currentTotal = add();
      break;

    case "-":
      console.log("subtract");
      currentTotal = subtract();
      break;

    case "/":
      console.log("divide");
      currentTotal = divide();
      break;

    case "*":
      console.log("multiply");
      currentTotal = multiply();
      break;
  }
}
