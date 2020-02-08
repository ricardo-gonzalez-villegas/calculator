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
let allowOperator = true;
let caseOne = false;
let caseTwo = false;

function equals() {
  setInterger();
  chooseOperation(operator);
  allowOperator = true;
}

function toInt(str) {
  return str * 1;
}

function setInterger() {
  if (isCalc === false) {
    return;
  } else {
    !firstInterger
      ? (firstInterger = intergerString)
      : (secondInterger = intergerString);
    setHistoryInterger();
    intergerString = "";
  }
}

function add() {
  console.log("first " + firstInterger);
  console.log("second " + secondInterger);
  if (isCalc) {
    total = toInt(firstInterger) + toInt(secondInterger);
    isCalc = false;
    allowOperator = false;
    console.log("i got to the orignal");
  } else if (!secondInterger) {
    total += toInt(firstInterger);
    console.log(" i got to the first part");
    caseOne = true;
    setHistoryInterger();
    setHistoryOperator();
  } else if (isCalc === false) {
    console.log(" i got to the second part");
    total += toInt(secondInterger);
    caseTwo = true;
    setHistoryOperator();
    setHistoryInterger();
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
    console.log("i got to the original");
  } else if (!secondInterger) {
    total -= toInt(firstInterger);
    console.log(" i got to the first part");
    caseOne = true;
    setHistoryInterger();
    setHistoryOperator();
  } else if (isCalc === false) {
    console.log(" i got to the second part");
    total -= toInt(secondInterger);
    caseTwo = true;
    setHistoryOperator();
    setHistoryInterger();
  }
  setDisplay();
  return total;
}

function divide() {
  if (secondInterger == 0) {
    history = "";
    historyDisplay.innerHTML = history;
    totalDisaply.innerHTML = "ERROR";
    return;
  }
  console.log("first " + firstInterger);
  console.log("second " + secondInterger);
  if (isCalc) {
    total = toInt(firstInterger) / toInt(secondInterger);
    isCalc = false;
  } else if (!secondInterger) {
    total /= toInt(firstInterger);
    console.log(" i got to the first part");
    caseOne = true;
    setHistoryInterger();
    setHistoryOperator();
  } else if (isCalc === false) {
    console.log(" i got to the second part");
    total /= toInt(secondInterger);
    caseTwo = true;
    setHistoryOperator();
    setHistoryInterger();
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
    console.log(" i got to the first part");
    caseOne = true;
    setHistoryInterger();
    setHistoryOperator();
  } else if (isCalc === false) {
    console.log(" i got to the second part");
    total *= toInt(secondInterger);
    caseTwo = true;
    setHistoryOperator();
    setHistoryInterger();
  }
  setDisplay();
  return total;
}

function createInterger(interger) {
  if (intergerString.length === 0 && interger == 0) {
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
  totalDisaply.innerHTML = "0";
}

function backspace() {
  if (intergerString.length === 0) {
    totalDisaply.innerHTML = Math.round((total + Number.EPSILON) * 100) / 100;
  } else {
    intergerString = intergerString.substring(0, intergerString.length - 1);
    intergerString.length === 0
      ? (totalDisaply.innerHTML = "0")
      : (totalDisaply.innerHTML = intergerString);
    if (intergerString.length == "0") {
      intergerString = "0";
    }
  }
}

function addPositiveOrNegative() {
  intergerString = intergerString * -1;
  totalDisaply.innerHTML = intergerString;
}

function setHistoryInterger() {
  let storeInt = "";
  if (caseOne) {
    if (firstInterger < 0) {
      storeInt = "(" + firstInterger + " )";
      history += storeInt;
      historyDisplay.innerHTML = history;
    } else {
      history += firstInterger;
      historyDisplay.innerHTML = history;
    }
    caseOne = false;
  } else if (caseTwo) {
    if (secondInterger < 0) {
      storeInt = "(" + secondInterger + " )";
      history += storeInt;
      historyDisplay.innerHTML = history;
    } else {
      history += secondInterger;
      historyDisplay.innerHTML = history;
    }
    caseTwo = false;
  } else {
    if (intergerString < 0) {
      storeInt = "(" + intergerString + " )";
      history += storeInt;
      historyDisplay.innerHTML = history;
    } else {
      history += intergerString;
      historyDisplay.innerHTML = history;
    }
  }
}

function setHistoryOperator() {
  console.log(history);
   if (allowOperator) {
    history += operator;
    if(history.includes("  ")){
      history = history.substring(0, history.length-2);
    }
    historyDisplay.innerHTML = history;
    console.log(history);
  }
}

const numeralButtons = document.querySelectorAll(".numeral");

numeralButtons.forEach(button => {
  button.addEventListener("click", event => {
    createInterger(event.target.dataset.value);
    if (isCalc === false) {
      firstInterger = "";
      secondInterger = "";
      history = "";
      historyDisplay.innerHTML = history;
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
    setHistoryOperator();
    allowOperator = false;
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
