class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    };
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    };
    delete() {

    };
    appendNumber(number) {
    this.currentOperand =number;
    };
    choseOperation(operation) {

    };
    compute () {

    };
    updateDisplay() {
        this.currentOperandText.innerText = this.currentOperand;

    };
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const resultButton = document.querySelector('[data-result]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const minusButton = document.querySelector('[data-minus]');
const previousOperandText = document.querySelector('[data-previous]');
const currentOperandText = document.querySelector('[data-current]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
});