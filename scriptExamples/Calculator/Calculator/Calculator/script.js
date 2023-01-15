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
    else display.value = target.innerHTML;

    if (target.classList.contains("ops")) {
        console.log("ops", target.innerHTML);
        return;
    }

    if (target.id === "clear") {
        display.value = 0;
    }
    //console.log("Number", target.innerHTML);
});

display.value = "0";

let ops = [];
operators.forEach(op => {
    ops.push(op.textContent);
});

let displayContents = [];

const clearAll = () => {
    displayContents = [];
    display.value = "0";
}

clearBtn.addEventListener("click", clearAll);

/* btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.textContent !== "AC" && btn.textContent != "=") {
            displayContents.push(btn.textContent);
            //console.log(typeof displayContents[0]);
            display.value += btn.textContent;
        }
    })
}); */

clearBtn.addEventListener("click", clearAll);

const getOp = (num1, num2, op) => {
    console.log(op[0]);

    switch (op) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "&divide;":
            return divide(num1, num2);
        case "X2":
            return add(num1, num2);
        case "&#8730;":
            return subtract(num1, num2);
        default:
            return "ERROR";
    }
}

const calculate = () => {
    let nums = displayContents.filter(el => el.match(/\d+/g));
    nums = nums.map(num => Number(num));
    let operation = displayContents.filter(el => ops.indexOf(el) !== -1);
    console.log({ nums, operation });
    for (let i = 0; i < nums.length; i++) {
        display.value = getOp(nums[i], nums[i + 1], operation[i]);
    }
}

equals.addEventListener("click", calculate);



let btn1 = document.getElementById("one");
let btn2 = document.getElementById("two");
let btn3 = document.getElementById("three");
let btn4 = document.getElementById("four");
let btn5 = document.getElementById("five");
let btn6 = document.getElementById("six");
let btn7 = document.getElementById("seven");
let btn8 = document.getElementById("eight");
let btn9 = document.getElementById("nine");
let btn0 = document.getElementById("zero");
let btnPlus = document.getElementById("add");
let btnMinus = document.getElementById("subtract");
let btnMultiply = document.getElementById("multiply");
let btnDivide = document.getElementById("divide");
let btnEquals = document.getElementById("equals");
let btnSquare = document.getElementById("square");
let btnSqrt = document.getElementById("sqrt");
let btnDec = document.getElementById("decimal");

function idButton(btn) {
    return btn.id;
}

