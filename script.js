const previousOperationText = document.querySelector("#last-operation");
const currentOperationText = document.querySelector("#result-number");
const buttons = document.querySelectorAll("#calculator-rows button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // add digit to calculator screen
    addDigit(digit) {
        //check if current operation already has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        
        this.currentOperation = digit;
        this.updateScreen();
    }

    // Process all calculator operations
    processOperation(operation) {
        // check if current is empty
        if(this.currentOperationText.innerText === "" && operation !== "c") {
            // Change operation
            if(this.previousOperationText.innerText !== "") {
                this.ChangeOperation(operation)
            }
            return;
        }
        
        // Get current and previous values
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "D":
                this.processDelOperator();
                break
            case "ce":
                this.processClearCurrentOperation();
                break
            case "c":
                this.processClearOperation();
                break
            case "=":
                this.processEqualOperator();
                break
            default:
                break;
        }
    }

    // Change values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
             // check if value is zero, if it is just add current value
             if(previous === 0) {
                operationValue = current;
             }

             // add current value to previous
             this.previousOperationText.innerText = `${operationValue} ${operation}`;
             this.currentOperationText.innerText = "";
        }
    }
    // Change math operation
    ChangeOperation(operation) {

        const mathOperations = ["*", "/", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // Clear current opration
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // Clear all operations
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Process an operation
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}



const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;
        
        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})