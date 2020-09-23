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
        if (!(number === '.' && this.currentOperand.includes('.'))) {
            this.currentOperand = this.currentOperand.toString() + number.toString()
        };
    };
    choseOperation(operation) {
        if (this.previousOperand !== '') {
            this.compute();
            this.operation = operation;
            this.previousOperand = this.previousOperand + this.currentOperand + this.operation;
            this.currentOperand = '';
        }
   };
    compute () {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(previous) ||isNaN(current)) return;
        if (this.currentOperand === '') {
            if (this.operation === 'Sqrt2') computation = Math.SQRT2;
            if (this.operation === '+-') computation = -current;
        } else {
            switch (this.operation) {
                case '+':
                    computation = previous + current;
                    break;
                case '-':
                    computation = previous - current;
                    break;
                case '*':
                    computation = previous * current;
                    break;
                case '÷':
                    computation = previous / current;
                    break;
                case '^':
                    computation = previous ** current;
                    break;
                default:
                    return;
            }
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    };
    updateDisplay() {
        this.currentOperandText.innerText = this.currentOperand;
        this.previousOperandText.innerText = this.previousOperand;
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
        calculator.updateDisplay();
    })
});

operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.choseOperation(operation.innerText);
        calculator.updateDisplay();
    })
});

resultButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})