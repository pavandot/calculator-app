const calculator = {
    displayValue:'0',
    firstOperand: null ,
    waitingForSecondOperand: false ,
    operator: null,
};

const inputDigit = (digit) => {
    const {displayValue,waitingForSecondOperand} = calculator
    if(waitingForSecondOperand === true) {
        calculator.displayValue = digit
        calculator.waitingForSecondOperand =false
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue+digit
    }
    console.log(calculator)
}

const inputDecimal = (dot) => {
    if(calculator.waitingForSecondOperand) {
        calculator.displayValue ='0.'
        calculator.waitingForSecondOperand=false
    }

    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot
    }
}

const handleOperator = (nextOperator) => {
    const {displayValue,firstOperand,operator} = calculator
    const inputValue = parseFloat(displayValue)
    if(operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator
        console.log(calculator)
        return;
    }

    if(firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue
    } else if(operator) {
        const result = calculat(firstOperand,inputValue,operator)

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`
        calculator.firstOperand=result
    }


    calculator.waitingForSecondOperand = true
    calculator.operator = nextOperator
    console.log(calculator)
} 

const calculat = (firstOperand,secondOperand,operator) => {
    if (operator === '+') {
        return firstOperand + secondOperand;
      } else if (operator === '-') {
        return firstOperand - secondOperand;
      } else if (operator === '*') {
        return firstOperand * secondOperand;
      } else if (operator === '/') {
        return firstOperand / secondOperand;
      }
    return secondOperand
}

const resetCalculator =() => {
    calculator.displayValue = '0'
    calculator.firstOperand = null
    calculator.waitingForSecondOperand= false
    calculator.operator = null
    console.log(calculator)
}

const delNumber = () => {
  const { displayValue } = calculator
  if(displayValue.length > 1) {
    calculator.displayValue=displayValue.slice(0,-1)
  } else {
    calculator.displayValue='0'
  }
}

const updateDisplay = () => {
    // select the element with class of `calculator-screen`
    const display = document.querySelector('.calculator-screen')
    // update the value of the element with the contents of `displayValue`
    display.value=calculator.displayValue
}

updateDisplay()

const keys = document.querySelector('.calculator-keys')
keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
      return;
    }
  
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value);
        break;
      case '.':
        inputDecimal(value);
        break;
      case 'all-clear':
        resetCalculator();
        break;
      case 'del':
        delNumber()
        updateDisplay()
        break;
      default:
        // check if the key is an integer
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }
  
    updateDisplay();
  });
  
 console.log('hello world') 