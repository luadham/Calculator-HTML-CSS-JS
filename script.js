const numbersSection = document.getElementById("numbers");
const expression = document.getElementById("expression");
const numbersRow = document.getElementsByClassName("three-numbers");
let divIndex = 2;


function generateNumbers() {
    for (let i = 1; i <= 9; i++) {
        let btn = document.createElement("button");
        btn.innerText = String(i)
        btn.classList.add("btn");
        numbersRow[divIndex].appendChild(btn);
        if (i == 3 || i == 6) divIndex--;
    }
}

generateNumbers();



document.addEventListener('click', (e) => {
    if (e.target.tagName == "BUTTON") {
        buttonFactory(e.target);
    }
});

function buttonFactory(clickedButton) {
    switch (clickedButton.id) {
        case "equal":
            evaluateExpression();
            break;
        case "clear":
            clearExpression();
            break;
        case "delete-last":
            deleteLastElement(0, expression.innerText.length - 1);
            break;
        case "remove-last-operation":
            removeLastOperation();
            break;
        default:
            appendToExp(clickedButton);
            break;
    }
}


function removeLastOperation() {
    let idx = 0;
    let expLen = expression.innerText.length - 1;
    for (let i = expLen; i >= 0; i--) {
        if (isNaN(expression.innerText[i])) {
            idx = i;
            break;
        }
    }
    deleteLastElement(0, idx);
}

function evaluateExpression() {
    expression.innerText = eval(expression.innerText);
}

function clearExpression() {
    expression.innerText = "";
}

function deleteLastElement(start, end) {
    expression.innerText = expression.innerText.substring(start, end);
}


function appendToExp(button) {
    if (!isNaN(button.innerText) && button.id != "div") {
        expression.innerText += button.innerText;
    } else {
        expression.innerText += operatorFactory(button.id);
    }
}

function operatorFactory(operatorId) {
    switch (operatorId) {
        case "add":
            return "+";
        case "sub":
            return "-";
        case "div":
            return "/";
        case "mul":
            return "*";
        case "fraction":
            return "1/";
        case "squared":
            return "**2";
        case "root":
            return "**0.5";
        case "rem":
            return "%";
    }
}


