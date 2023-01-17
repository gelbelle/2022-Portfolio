/**
 * This program creates a basic calculator with functional addition, subtraction, multiplication, division, square, and squareroot buttons.
 */

const calcSession = {
    digits: [],
    func: []
}

const add = (num1, num2) => {
    console.log(typeof num1, typeof num2);
    return num1 + num2;
}

const subtract = (num1, num2) => {
    console.log(typeof num1, typeof num2);

    return num1 - num2;
}

const multiply = (num1, num2) => {
    console.log(typeof num1, typeof num2);

    return num1 * num2;
}

const divide = (num1, num2) => {
    if (num2 === 0) {
        return "DIV BY 0 ERR";
    } else {
        console.log(typeof num1, typeof num2);

        return num1 / num2;
    }
}

const square = (num) => {
    return Math.pow(num, 2);
}

const squareRoot = (num) => {
    console.log(typeof num);

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
let prevBtn

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

const removeTag = (tag) => {
    tag.forEach(tag => operators.forEach(op => op.classList.remove(tag)));
}

const oneOp = () => {
    let numOps = 0;
    operators.forEach(item => {
        if (item.classList.contains("current")) numOps++
    });

    return numOps === 0;
}

let displayChanged = false;
display.addEventListener("change", () => { displayChanged = true; });
allBtns.addEventListener("click", (evt) => {
    const { target } = evt;
    if (!target.matches("button")) return;

    if (target.classList.contains("number")) {
        updateDisplay(target);
        displayChanged = true;
    }

    if (target.classList.contains("ops")) {
        calcSession.func.push(display.value);
        if (!oneOp()) {
            removeTag(["current"]);
            let idx = calcSession.func.length - 2;
            calcSession.func.splice(idx);
        };
        target.classList.add("current");

        if (opClicked()) removeTag(["clicked"]);

        target.classList.add("clicked");
        calcSession.func.push(target.innerHTML);
        displayChanged = false;
        return;
    }

    //TODO fix decimal only works on first entry
    if (target.innerHTML === ".") {
        if (!display.value.includes(target.innerHTML)) updateDisplay(target);
    }

    if (target.id === "equals") {
        if (displayChanged) calcSession.func.push(display.value);

        if (calcSession.func.length >= 3) display.value = getOp(calcSession.func);
        else return;
        removeTag(["clicked", "current"]);
        equals.classList.add("clicked");
        calcSession.func = [];
    }

    if (target.id === "clear") resetCalc();
    //console.log(calcSession.func);

});

const operate = (arr, ans = 0) => {
    console.log(calcSession.func);
    let num1 = Number(arr[0]);
    let operation = arr[1];
    //console.log({ operation }, "\u221A");
    let num2 = Number(arr[2]);

    switch (operation) {
        case "x":
            ans = multiply(num1, num2);
            break;
        case "\xF7":
            ans = divide(num1, num2);
            break;
        case "+":
            ans = add(num1, num2);
            break;
        case "-":
            ans = subtract(num1, num2);
            break;
        case "X<sup>2</sup>":
            ans = square(num1);
            break;
        case "\u221A":
            ans = Math.sqrt(num1);
            break;
        default:
            return "ERROR";
    }
    return ans;
}

const getOp = (arr, ans = 0) => {
    console.log(arr);
    if (arr.length >= 3) {
        ans = operate(arr, ans);
        arr.splice(0, 3)
        arr.unshift(ans);
        ans = getOp(arr, ans);
    }
    return ans;
}

//let test = [4, "+", 5, "-", 2];

resetCalc();
//display.value = getOp(test);