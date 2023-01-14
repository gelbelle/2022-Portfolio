/**
 * This program creates a basic calculator with functional addition, subtraction, multiplication, division, square, and squareroot buttons.
 */

const operation = (btnId) => {
    switch (btnId) {
        case "add":
            add(num1, num2);
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtraction(num1, num2) {
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
        return Math.sqrt(num);
    }
}

const currInput = document.getElementById("currInput");
const answer = document.getElementById("answer");
const nums = document.querySelectorAll(".num");
const clearBtn = document.getElementById("clear");
const equals = document.getElementById("equals");
const operators = document.querySelectorAll(".ops");
const btns = document.querySelectorAll("button");

let ops = [];
operators.forEach(op => {
    ops.push(op.textContent);
});

let inputScreen = [];

const clearAll = () => {
    answer.innerHtml = 0;
    inputScreen = [];
    currInput.innerHTML = "";
}

clearBtn.addEventListener("click", clearAll);

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.textContent !== "AC" && btn.textContent != "=") {
        inputScreen.push(btn.textContent);
        //console.log(typeof inputScreen[0]);
        currInput.innerHTML += btn.textContent;
    }
})
});

clearBtn.addEventListener("click", clearAll);

console.log(inputScreen[0]);
//Array containing numbers on the input screen
let test = ["4", "+", "6"];

const getOp = (num1, num2, op) => {
    switch (op) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
    }
}

const calculate = () => {
    //console.log({ test });
    let nums = inputScreen.filter(el => el.match(/\d+/g));
    nums = nums.map(num => Number(num));
    let operation = inputScreen.filter(el => ops.indexOf(el) !== -1);
    console.log({ nums, operation });
    for (let i = 0; i < nums.length; i++) {
        answer.innerHTML = getOp(nums[i], nums[i + 1], operation[i]);
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

