"use strict";
let totalDisaply = document.getElementById("total-display");
let historyDisplay = document.getElementById("history-display");
let operator = "";
let intergerString = "0";
let firstInterger = "";
let secondInterger = "";
let total = "";
let history = "";
let isCalc = true;

function equals() {
  setInterger();
  chooseOperation(operator);
}

function toInt(str) {
  return str * 1;
}

function setInterger() {
  if (intergerString == ".") {
    return;
  }
  if (isCalc === false) {
    return;
  } else {
    !firstInterger
      ? (firstInterger = intergerString)
      : (secondInterger = intergerString);
    intergerString = "";
  }
}

function add() {
  console.log("first " + firstInterger);
  console.log("second " + secondInterger);
  if (isCalc) {
    total = toInt(firstInterger) + toInt(secondInterger);
    isCalc = false;
  } else if (!secondInterger) {
    total += toInt(firstInterger);
  } else if (isCalc === false) {
    total += toInt(secondInterger);
  }
  setDisplay();
  return total;
}

function subtract() {
  console.log("first " + firstInterger);
  console.log("second " + secondInterger);
  if (isCalc) {
    total = toInt(firstInterger) - toInt(secondInterger);
    isCalc = false;
  } else if (!secondInterger) {
    total -= toInt(firstInterger);
  } else if (isCalc === false) {
    total -= toInt(secondInterger);
  }
  setDisplay();
  return total;
}

function divide() {
  if(secondInterger == 0){
    totalDisaply.innerHTML = 'ERROR';
    return;
  }
  console.log("first " + firstInterger);
  console.log("second " + secondInterger);
  if (isCalc) {
    total = toInt(firstInterger) / toInt(secondInterger);
    isCalc = false;
  } else if (!secondInterger) {
    total /= toInt(firstInterger);
  } else if (isCalc === false) {
    total /= toInt(secondInterger);
  }
  setDisplay();
  return total;
}

function multiply() {
  console.log("first " + firstInterger);
  console.log("second " + secondInterger);
  if (isCalc) {
    total = toInt(firstInterger) * toInt(secondInterger);
    isCalc = false;
  } else if (!secondInterger) {
    total *= toInt(firstInterger);
  } else if (isCalc === false) {
    total *= toInt(secondInterger);
  }
  setDisplay();
  return total;
}

function saveIntergers() {
  previousInteger = currentInteger;
  currentTotal = currentInteger;
  currentInteger = 0;
  setHistory();
}

function createInterger(interger) {
  if (intergerString.length === 1 && interger == 0) {
    return;
  }
  if (interger === "." && intergerString.includes(".")) {
    return;
  }
  if (
    (intergerString == "0" && interger == ".") ||
    (intergerString == "" && interger == ".")
  ) {
    intergerString = "0.";
  } else if (intergerString == "0") {
    intergerString = interger;
  } else {
    intergerString += interger;
  }

  totalDisaply.innerHTML = intergerString;
  console.log(intergerString);
}

function setDisplay() {
  totalDisaply.innerHTML = Math.round((total + Number.EPSILON) * 100) / 100;
}

function clearEverything() {
  location.reload();
}

function clearInterger() {
  intergerString = "";
  totalDisaply.innerHTML = '0';
}

function backspace() {
  if (intergerString.length === 0) {
    totalDisaply.innerHTML =
      Math.round((total + Number.EPSILON) * 100) / 100;
  } else {
    intergerString = intergerString.substring(0, intergerString.length - 1);
    intergerString.length === 0
      ? (totalDisaply.innerHTML = '0')
      : (totalDisaply.innerHTML = intergerString);
    if (intergerString.length == '0') {
      intergerString = '0';
    }
  }
}

function addPositiveOrNegative() {
  intergerString = intergerString * -1;
  totalDisaply.innerHTML = intergerString;
}

function setHistory() {
  history += previousInteger + " " + operator + " ";
  historyDisplay.innerHTML = history;
}

const numeralButtons = document.querySelectorAll(".numeral");

numeralButtons.forEach(button => {
  button.addEventListener("click", event => {
    createInterger(event.target.dataset.value);
    if (isCalc === false) {
      firstInterger = "";
      secondInterger = "";
      isCalc = true;
    }
  });
});

const nonNumeralButtons = document.querySelectorAll(".operator");

nonNumeralButtons.forEach(button => {
  button.addEventListener("click", event => {
    console.log(event.target.dataset.value);
    operator = event.target.dataset.value;
    if (isCalc === false) {
      firstInterger = total;
      secondInterger = "";
      isCalc = true;
    }
    setInterger();
  });
});

function chooseOperation(operator) {
  switch (operator) {
    case "+":
      console.log("add");
      total = add();
      break;

    case "-":
      console.log("subtract");
      total = subtract();
      break;

    case "/":
      console.log("divide");
      total = divide();
      break;

    case "*":
      console.log("multiply");
      total = multiply();
      break;
  }
}
