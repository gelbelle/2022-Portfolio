/**
 * This program creates a basic calculator with addition, subtraction, multiplication, division, square, and squareroot functions.
 * @author Angeleah Hoeppner
 * @date January 18, 2023
 * @version 1.0
 */

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

const updateDisplay = (target, calculator) => {

    let equalsPressed = equals.classList.contains("clicked");
    if (opClicked(calculator.operators)) {
        display.value = target.innerHTML;
        removeTag(["clicked"], calculator.operators);
    } else {
        display.value = (display.value === "0" || equalsPressed) ? target.innerHTML : display.value + target.innerHTML;
        equals.classList.remove("clicked");
    }
    calculator.displayChanged = true;
}

const resetCalc = (operators) => {
    display.value = "0";
    equals.classList.remove("clicked");
    operators.forEach(op => {
        op.classList.remove("clicked");
    });
}

const opClicked = (operators) => {
    return [...operators].filter(op => op.classList.contains("clicked")).length > 0;
}

const removeTag = (tag, operators) => {
    tag.forEach(tag => operators.forEach(op => op.classList.remove(tag)));
}

const oneOp = (operators) => {
    let numOps = 0;
    operators.forEach(item => {
        if (item.classList.contains("current")) numOps++
    });

    return numOps === 0;
}

const calculate = (calculator, ans = 0) => {
    let num1 = Number(calculator.toCalc[0]);
    let operation = calculator.toCalc[1];
    let num2 = Number(calculator.toCalc[2]);

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
            calculator.answered = true;
            ans = square(num1);
            break;
        case "\u221A":
            calculator.answered = true;
            if (num1 <= 0) ans = "NEG SQRT ERROR";
            else ans = Math.sqrt(num1);
            break;
        default:
            return "ERROR";
    }
    return ans;
}

const getOp = (calculator, ans = 0) => {
    if (calculator.toCalc.length >= 2) {
        ans = calculate(calculator, ans);
        calculator.toCalc.splice(0, 3)
        calculator.toCalc.unshift(ans);
        ans = getOp(calculator, ans);
    }
    return ans;
}

const handleOperations = (target, calculator) => {
    if (!oneOp(calculator.operators)) {
        removeTag(["current"], calculator.operators);
        let idx = calculator.toCalc.length - 2;
        calculator.toCalc.splice(idx);
    };
    target.classList.add("current");

    if (opClicked(calculator.operators)) removeTag(["clicked"]);

    target.classList.add("clicked");
    calculator.toCalc.push(target.innerHTML);
    calculator.displayChanged = false;
    calculator.hasDecimal = false;
}

const handleSingleNum = (target, calcSession) => {
    calcSession.toCalc.push(display.value);
    calcSession.toCalc.push(target.innerHTML);

    display.value = getOp(calcSession);
    calcSession.answered = true;

    calcSession.toCalc = [];
}

const handleDecimal = (target, calculator) => {
    if (!display.value.includes(target.innerHTML)) {
        display.value = (display.value === "0") ? "0." : display.value + target.innerHTML
    }
    calculator.hasDecimal = true;
}

const getAnswer = (calculator) => {
    if (calculator.displayChanged) calculator.toCalc.push(display.value);
    if (calculator.toCalc.length >= 3) display.value = getOp(calculator);
    else return;
    removeTag(["clicked", "current"], calculator.operators);
    equals.classList.add("clicked");
    calculator.toCalc = [];
    calculator.answered = true;
}

const main = () => {
    let calcSession = {
        toCalc: [],
        hasDecimal: false,
        displayChanged: false,
        answered: false,
        operators: document.querySelectorAll(".ops"),
        display: document.getElementById("display")
    }

    const allBtns = document.getElementById("buttons");

    resetCalc(calcSession.operators);

    allBtns.addEventListener("click", (evt) => {

        const { target } = evt;
        if (!target.matches("button")) return;

        if (target.classList.contains("number")) {
            if (calcSession.answered) {
                display.value = "";
                calcSession.answered = false;
            }
            updateDisplay(target, calcSession);
        }

        if (target.classList.contains("single")) {
            handleSingleNum(target, calcSession);
        } else {
            if (target.classList.contains("ops")) {
                calcSession.toCalc.push(display.value);
                handleOperations(target, calcSession);
            }
        }

        if (target.innerHTML === ".") {
            handleDecimal(target, calcSession);
        }

        if (target.id === "equals") {
            getAnswer(calcSession);
        }

        if (target.id === "clear") resetCalc(calcSession.operators);
    });
}

main();