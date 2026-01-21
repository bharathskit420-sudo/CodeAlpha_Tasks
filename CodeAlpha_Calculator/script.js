let first = "";
let second = "";
let operator = "";
let isSecond = false;

const display = document.getElementById("display");

function updateDisplay(value) {
    display.value = value || "0";
}

function appendNumber(num) {
    if (!isSecond) {
        first += num;
        updateDisplay(first);
    } else {
        second += num;
        updateDisplay(second);
    }
}

function setOperator(op) {
    if (first === "") return;
    operator = op;
    isSecond = true;
}

function calculate() {
    if (first === "" || second === "") return;

    let a = parseFloat(first);
    let b = parseFloat(second);
    let result;

    switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = b === 0 ? "Error" : a / b; break;
    }

    updateDisplay(result);
    first = result.toString();
    second = "";
    isSecond = false;
}

function clearAll() {
    first = "";
    second = "";
    operator = "";
    isSecond = false;
    updateDisplay("0");
}

/* ✅ KEYBOARD SUPPORT */
document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
    if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
    if (e.key === "Enter") calculate();
    if (e.key === "Escape") clearAll();
    if (e.key === "Backspace") {
        if (!isSecond) {
            first = first.slice(0, -1);
            updateDisplay(first);
        } else {
            second = second.slice(0, -1);
            updateDisplay(second);
        }
    }
});