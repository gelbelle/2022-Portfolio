/**
 * This program creates a basic calculator with functional addition, subtraction, multiplication, division, square, and squareroot buttons.
 */

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

let btn1 = getElementById("one");
let btn2 = getElementById("two");
let btn3 = getElementById("three");
let btn4 = getElementById("four");
let btn5 = getElementById("five");
let btn6 = getElementById("six");
let btn7 = getElementById("seven");
let btn8 = getElementById("eight");
let btn9 = getElementById("nine");
let btn0 = getElementById("zero");
let btnPlus = getElementById("add");
let btnMinus = getElementById("subtract");
let btnMultiply = getElementById("multiply");
let btnDivide = getElementById("divide");
let btnEquals = getElementById("equals");
let btnSquare = getElementById("square");
let btnSqrt = getElementById("sqrt");
