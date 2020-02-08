"use strict";
let totalDisaply = document.getElementById("total-display");
let operator = "";
let intergerString = "0";
let firstInterger = "";
let secondInterger = "";
let total = "";
let isCalc = true;

function equals() {
  setInterger();
  chooseOperation(operator);
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
    intergerString = "";
  }
}

function add() {
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
  if (secondInterger == 0) {
    totalDisaply.innerHTML = "ERROR";
    return;
  }
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

function getSquared() {
  setInterger();
  if (isCalc) {
    total = toInt(firstInterger) * toInt(firstInterger);
    isCalc = false;
  } else if (!isCalc) {
    total *= total;
  }
  setDisplay();
  return total;
}

function getSquareroot() {
  setInterger();
  if (isCalc) {
    total = Math.sqrt(toInt(firstInterger));
    isCalc = false;
  } else if (!isCalc) {
    total = Math.sqrt(total);
  }
  setDisplay();
  return total;
}

function getFraction() {
  setInterger();
  if (isCalc) {
    total = 1 / toInt(firstInterger);
    isCalc = false;
  } else if (!isCalc) {
    total = 1 / total;
  }
  setDisplay();
  return total;
}

function getPercentage() {
  setInterger();
  if (isCalc) {
    total = toInt(firstInterger) / 100;
    isCalc = false;
  } else if (!isCalc) {
    total /= 100;
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
}

function setDisplay() {
  if (isNaN(total)) {
    totalDisaply.innerHTML = "ERROR";
  } else {
    totalDisaply.innerHTML = Math.round((total + Number.EPSILON) * 100) / 100;
  }
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
  if (total) {
    total = total * -1;
    totalDisaply.innerHTML = Math.round((total + Number.EPSILON) * 100) / 100;
  } else {
    intergerString = intergerString * -1;
    totalDisaply.innerHTML = intergerString;
  }
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
    operator = event.target.dataset.value;
    if (isCalc === false) {
      firstInterger = total;
      secondInterger = "";
      isCalc = true;
    }
    setInterger();
  });
});

window.addEventListener("keydown", checkKey);

function checkKey(e) {
  const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
  if (!key) return;
  switch (key.dataset.value) {
    case "=":
      equals();
      break;

    case "n":
      addPositiveOrNegative();
      break;

    case "ce":
      clearEverything();
      break;

    case "c":
      clearInterger();
      break;

    case "b":
      backspace();
      break;

    case "r":
      getSquareroot();
      break;

    case "s":
      getSquared();
      break;

    case "p":
      getPercentage();
      break;

    case "f":
      getFraction();
      break;
  }
  if (
    (key.dataset.value >= 0 && key.dataset.value <= 9) ||
    key.dataset.value == "."
  ) {
    createInterger(key.dataset.value);
    if (isCalc === false) {
      firstInterger = "";
      secondInterger = "";
      isCalc = true;
    }
  }
  if (key.classList.contains("operator")) {
    if (isCalc === false) {
      firstInterger = total;
      secondInterger = "";
      isCalc = true;
    }
    operator = key.dataset.value;
    setInterger();
  }
}

function chooseOperation(operator) {
  switch (operator) {
    case "+":
      total = add();
      break;

    case "-":
      total = subtract();
      break;

    case "/":
      total = divide();
      break;

    case "*":
      total = multiply();
      break;
  }
}