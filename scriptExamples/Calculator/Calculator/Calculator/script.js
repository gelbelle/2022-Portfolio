/**
 * This program creates a basic calculator with functional addition, subtraction, multiplication, division, square, and squareroot buttons.
 */

function add(num1, num2) {
    return String(num1 + num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "DIV BY 0 ERR";
    } else {
        return num1 / num2;
    }
}

function square(num) {
    return Math.pow(num, 2);
}

function squareRoot(num) {
    if (num <= 0) {
        return "NEG SQ RT ERR";
    } else {
        return String(Math.sqrt(num));
    }
}

const display = document.getElementById("display");
const answer = document.getElementById("answer");
const nums = document.querySelectorAll(".num");
const clearBtn = document.getElementById("clear");
const equals = document.getElementById("equals");
const operators = document.querySelectorAll(".ops");
const btns = document.querySelectorAll("button");
const allBtns = document.getElementById("buttons");

display.value = "0";

const updateDisplay = (target) => {
    let opClicked = [...operators].filter(op => op.classList.contains("clicked"));
    let equalsPressed = equals.classList.contains("clicked");
    if (opClicked.length > 0) {
        display.value = target.innerHTML;
    } else {
        display.value = (display.value === "0" || equalsPressed) ? target.innerHTML : display.value + target.innerHTML;
        equals.classList.remove("clicked");
    }
}

allBtns.addEventListener("click", (evt) => {
    const { target } = evt;

    if (!target.matches("button")) return;

    if (target.classList.contains("number")) {
        updateDisplay(target);
    }

    if (target.classList.contains("ops")) {
        target.classList.add("clicked");
        return;
    }
    if (target.innerHTML === ".") {
        if (!display.value.includes(target.innerHTML)) display.value += ".";
    }

    if (target.id === "equals") {
        if ([...operators].filter(op => op.classList.contains("clicked"))) {
            operate();

            //TODO Only run if an operator is clicked, currently running if true or false
            //display.value = getOp(display.value);
        }
        equals.classList.add("clicked");
        console.log("Outside if");
    }

    if (target.id === "clear") {
        display.value = "0";
        equals.classList.remove("clicked");
        operators.forEach(op => {
            op.classList.remove("clicked");
        });
    }
});

const operate = () => {
    console.log("In operate");
    operators.forEach(op => {
        op.classList.remove("clicked");
    });
    display.value = getOp(display.value);
}

let ops = [];
operators.forEach(op => {
    ops.push(op.textContent);
});

const getOp = (str) => {
    console.log(str);
    let operation = [...str].filter(el => ops.indexOf(el) !== -1);
    console.log(operation);
    switch (operation[0]) {
        case "x":
            return multiply(num1, num2);
        case "&divide;":
            return divide(num1, num2);
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "X2":
            return square(num1);
        case "&#8730;":
            return Math.sqrt(num1);
        default:
            return "ERROR";
    }
}