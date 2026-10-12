let display = document.getElementById("display");
let expression = "";

function addValue(value) {
    if (expression === "Error") {
        expression = "";
    }

    if (value === ".") {
        let lastNumber = expression.split(/[+\-*/%]/).pop();

        if (lastNumber.includes(".")) {
            return;
        }
    }

    if (["+", "-", "*", "/", "%"].includes(value)) {
        if (expression === "" && value !== "-") {
            return;
        }

        if (/[+\-*/%]$/.test(expression)) {
            expression = expression.slice(0, -1);
        }
    }

    expression += value;
    display.value = expression;
}

function clearDisplay() {
    expression = "";
    display.value = "0";
}

function deleteNumber() {
    expression = expression.slice(0, -1);
    display.value = expression || "0";
}

function calculate() {
    try {
        if (expression === "") {
            return;
        }

        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Invalid");
        }

        if (!/[0-9]$/.test(expression)) {
            throw new Error("Invalid");
        }

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid");
        }

        expression = String(
            Number(result.toPrecision(12))
        );

        display.value = expression;

    } catch (error) {
        expression = "Error";
        display.value = "Error";
    }
}