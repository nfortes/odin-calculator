let operand_1;
let operand_2;
let operator = '';
let result = '';
let digits = 0;
let getOp2 = false;
let hasDec = false;
let equalsClicked = false;

console.log(result);
const operands = Array.from(document.querySelectorAll('[operand]'));
const operators = Array.from(document.querySelectorAll('[operator]'));
const display = document.getElementById('display');

function add(x,y) {
    return x+y;    
}

function subtract(x,y) {
    return x-y;
}

function multiply(x,y) {
    return x*y;
}

function divide(x,y) {
    return x/y;
}

function mod(x,y) {
    return x%y;
}

function clear() {
    operand_1 = 0;
    operand_2 = 0
    operator = '';
    result = '';
    display.textContent = '';
    digits = 0;
    getOp2 = false;
    hasDec = false;
    equalsClicked = false;
}

function operate(x, y, o) {
    console.log(o);
    switch (o) {
        case '+':
            return add(x,y);
        case '-':
            return subtract(x,y);
        case '*':
            return multiply(x,y);
        case '/':
            return divide(x,y);
        case '%':
            return mod(x,y);
        default:
            break;
    }
}

function populate_display(number) {
    if (digits<9) {
        if (!(number == '.' && hasDec)) {
            if (Number(result)==0) {
                result = number;
                display.textContent = number;
                digits++;
            }
            else if (equalsClicked) {
                result = number;
                display.textContent = number;
                digits++;
                operator = ''
                equalsClicked = false;
            }
            else {
                if (getOp2) {                
                    result = number;
                    display.textContent = result;
                    digits++;
                    getOp2 = false;
                }
                else {
                    result = result+number;
                    display.textContent = result;
                    digits++;
                }
            }
            if (number == '.') {
                hasDec = true;
            }
        }
    }
}

function parse(op) {
    if (operator == '') { // if no operator has been selected yet
        operator = op;
        operand_1 = Number(result);
        display.textContent = result;
        getOp2 = true;
        digits = 0;
        console.log('hii');
    }
    else { // if more operators has been selected
        operand_2 = Number(operand_1);
        operand_1 = Number(result);
        equals();
        getOp2 = false;
    }
}

function equals() {
    if (!equalsClicked) {
        if (operator=='') {
            display.textContent = result;
        }
        else {
            operand_2 = Number(result);
            result = operate(operand_1,operand_2,operator);
            display.textContent = result;
            getOp2 = false;
        }   
    }
    equalsClicked = true;
}

operands.forEach(button => button.addEventListener('click', () => populate_display(button.textContent)));
operators.forEach(button => button.addEventListener('click', () => parse(button.textContent)));
document.querySelector('[clear]').addEventListener('click', () => clear());
document.querySelector('[equals]').addEventListener('click', () => equals());