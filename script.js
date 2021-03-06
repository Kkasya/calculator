class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.endResult = false;
        this.clear();
    };
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.unary = undefined;
    };
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };
    appendNumber(number) {
        if (this.endResult === true && this.operation === undefined) this.clear();
        this.endResult = false;
        if (!(number === '.' && this.currentOperand.includes('.'))) {
            this.currentOperand = this.currentOperand.toString() + number.toString()
        };

    };
    choseOperation(operation) {
            if (this.currentOperand === '') return;
            if (this.previousOperand !== '') this.compute();
            this.operation = operation;
            this.previousOperand = this.previousOperand + this.currentOperand + this.operation;
            this.currentOperand = '';
   };
    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(previous) ||isNaN(current)) return;
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
        this.currentOperand = String(Number((Number(computation)).toFixed(7)));
        this.operation = undefined;
        this.previousOperand = '';
    };
    compareUnary(unary) {
        let computationUnary;
        this.unary = unary;
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        if (this.unary === 'Sqrt') {
            computationUnary = Math.sqrt(current);
        }
        if (this.unary === '+-') {
            computationUnary = -current;
            }
        this.currentOperand = computationUnary;
        this.unary = undefined;
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
const unaryButtons = document.querySelectorAll('[data-unary]');
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
    calculator.endResult = true;
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

unaryButtons.forEach(unary => {
    unary.addEventListener('click', () => {
        calculator.compareUnary(unary.innerText);
        calculator.updateDisplay();
        calculator.endResult = true;
    })
});