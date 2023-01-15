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

allBtns.addEventListener("click", (evt) => {
    const { target } = evt;

    if (!target.matches("button")) return;

    if (target.classList.contains("number")) {
        console.log(target.innerHTML);
        let opClicked = [...operators].filter(op => op.classList.contains("clicked"));
        if (opClicked.length > 0) {
            display.value = target.innerHTML;
        } else {
            display.value = (display.value === "0") ? target.innerHTML : display.value + target.innerHTML;
        }
    }

    if (target.classList.contains("ops")) {
        target.classList.add("clicked");
        return;
    }

    if (target.id === "equals") {
        operators.forEach(op => {
            op.classList.remove("clicked");
        });
        display.value = getOp(display.value);
    }

    if (target.id === "clear") {
        display.value = "0";
        operators.forEach(op => {
            op.classList.remove("clicked");
        });
    }
});

display.value = "0";

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