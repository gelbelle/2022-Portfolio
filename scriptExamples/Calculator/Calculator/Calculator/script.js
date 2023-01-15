/**
 * This program creates a basic calculator with functional addition, subtraction, multiplication, division, square, and squareroot buttons.
 */

const calcSession = {
    digits: [],
    operators: []
}

const add = (num1, num2) => {
    return String(num1 + num2);
}

const subtract = (num1, num2) => {
    return num1 - num2;
}

const multiply = (num1, num2) => {
    return num1 * num2;
}

const divide = (num1, num2) => {
    if (num2 === 0) {
        return "DIV BY 0 ERR";
    } else {
        return num1 / num2;
    }
}

const square = (num) => {
    return Math.pow(num, 2);
}

const squareRoot = (num) => {
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
let toCalc = [];

const updateDisplay = (target) => {
    let equalsPressed = equals.classList.contains("clicked");
    if (opClicked) {
        display.value = target.innerHTML;
    } else {
        display.value = (display.value === "0" || equalsPressed) ? target.innerHTML : display.value + target.innerHTML;
        equals.classList.remove("clicked");
    }
}

const resetCalc = () => {
    display.value = "0";
    equals.classList.remove("clicked");
    operators.forEach(op => {
        op.classList.remove("clicked");
    });
}

const opClicked = () => {
    return [...operators].filter(op => op.classList.contains("clicked")).length > 0;
}

allBtns.addEventListener("click", (evt) => {
    const { target } = evt;

    if (!target.matches("button")) return;

    if (target.classList.contains("number")) {
        updateDisplay(target);
    }

    if (target.classList.contains("ops")) {
        target.classList.add("clicked");
        calcSession.digits.push(display.value);

        return;
    }

    //TODO decimal not adding if number clicked
    if (target.innerHTML === ".") {
        if (!display.value.includes(target.innerHTML)) display.value += ".";
        else if (opClicked) display.value = "0.";
    }

    //TODO run operations only when = clicked
    if (target.id === "equals") {
        calcSession.digits.push(display.value);
        calcSession.operators = [...operators].filter(op => op.classList.contains("clicked"));

        console.log(calcSession);
        //display.value = getOp(display.value);

        equals.classList.add("clicked");
        //console.log("Outside if");
    }

    if (target.id === "clear") resetCalc();

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
    let idx = str.indexOf(str.match(/\d+/));
    let num1 = str.substring(idx, 1);
    str.slice(idx, 1);
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

resetCalc();