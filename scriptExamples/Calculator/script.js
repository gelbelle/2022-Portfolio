/**
 * This program creates a basic calculator with functional addition, subtraction, multiplication, division, square, and squareroot buttons.
 */

const calcSession = {
    digits: [],
    operators: []
}

const add = (num1, num2) => {
    return num1 + num2;
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
        return Math.sqrt(num);
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
    if (opClicked()) {
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

const handleDecimal = (target) => {
    if (!display.value.includes(target.innerHTML)) updateDisplay(target);
}

allBtns.addEventListener("click", (evt) => {
    const { target } = evt;
    if (!target.matches("button")) return;

    if (target.classList.contains("number")) {
        updateDisplay(target);
    }

    if (target.classList.contains("ops")) {
        calcSession.digits.push(display.value);
        if (opClicked()) {
            operators.forEach(op => {
                op.classList.remove("clicked");
            });
        }
        target.classList.add("clicked");
        calcSession.operators.push(target.innerHTML);

        return;
    }

    if (target.innerHTML === ".") {
        handleDecimal(target);
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

const operate = (arr, ans = 0) => {
    let num1 = arr[0];
    let operation = arr[1];
    let num2 = arr[2];

    switch (operation) {
        case "x":
            ans = multiply(num1, num2);
            break;
        case "&divide;":
            ans = divide(num1, num2);
            break;
        case "+":
            ans = add(num1, num2);
            break;
        case "-":
            ans = subtract(num1, num2);
            break;

        case "X2":
            ans = square(num1);
            break;
        case "&#8730;":
            ans = Math.sqrt(num1);
            break;
        default:
            return "ERROR";
    }
    return ans;
}

const getOp = (arr, ans = 0) => {
    if (arr.length >= 3) {
        ans = operate(arr, ans);
        arr.splice(0, 3)
        arr.unshift(ans);
        ans = getOp(arr, ans);
    }
    return ans;
}

let test = [4, "+", 5, "-", 2];

resetCalc();
display.value = getOp(test);