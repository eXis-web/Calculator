import React, { Component } from 'react';
import '../index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      previousOperand: '',
      currentOperand: '',
      operation: undefined,
    };
  }

  clear = () => {
    this.setState({
      currentOperand: '',
      previousOperand: '',
      operation: undefined,
    }, this.updateDisplay);
  };

  delete = () => {
    this.setState((prevState) => ({
      currentOperand: prevState.currentOperand.slice(0, -1),
    }), this.updateDisplay);
  };

  appendNumber = (number) => {
    if (number === '.' && this.state.currentOperand.includes('.')) return;

    this.setState((prevState) => ({
      currentOperand: prevState.currentOperand + number,
    }), this.updateDisplay);
  };

  chooseOperation = (operation) => {
    if (this.state.currentOperand === '') return;
    if (this.state.previousOperand !== '') {
      this.compute();
    }
    this.setState({
      operation,
      previousOperand: this.state.currentOperand,
      currentOperand: '',
    }, this.updateDisplay);
  };

  compute = () => {
    const prev = parseFloat(this.state.previousOperand);
    const current = parseFloat(this.state.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    let computation;
    switch (this.state.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }

    this.setState({
      currentOperand: computation.toString(),
      operation: undefined,
      previousOperand: '',
    }, this.updateDisplay);
  };

  getDisplayNumber = (number) => {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay = isNaN(integerDigits) ? '' : integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });

    return decimalDigits != null ? `${integerDisplay}.${decimalDigits}` : integerDisplay;
  };

  updateDisplay = () => {
    const previousOperandTextElement = document.querySelector('[data-previous-operand]');
    const currentOperandTextElement = document.querySelector('[data-current-operand]');
  
    if (previousOperandTextElement && currentOperandTextElement) {
      previousOperandTextElement.innerText = this.state.previousOperand;
      currentOperandTextElement.innerText = this.state.operation
        ? `${this.state.operation} ${this.state.currentOperand}`
        : this.state.currentOperand;
    }
  };

  render() {
    return (
      <div className="calculator-grid">
        <div className="output">
          <div data-previous-operand className="previous-operand">
            {this.state.previousOperand}
          </div>
          <div data-current-operand className="current-operand">
            {this.state.currentOperand}
          </div>
        </div>
        <button onClick={this.clear} data-all-clear className="span-two">
          AC
        </button>
        <button onClick={this.delete} data-delete>
          DEL
        </button>
        <button onClick={() => this.chooseOperation('÷')} data-operation>
          ÷
        </button>
        <button onClick={() => this.appendNumber('1')} data-number>
          1
        </button>
        <button onClick={() => this.appendNumber('2')} data-number>
          2
        </button>
        <button onClick={() => this.appendNumber('3')} data-number>
          3
        </button>
        <button onClick={() => this.chooseOperation('*')} data-operation>
          *
        </button>
        <button onClick={() => this.appendNumber('4')} data-number>
          4
        </button>
        <button onClick={() => this.appendNumber('5')} data-number>
          5
        </button>
        <button onClick={() => this.appendNumber('6')} data-number>
          6
        </button>
        <button onClick={() => this.chooseOperation('+')} data-operation>
          +
        </button>
        <button onClick={() => this.appendNumber('7')} data-number>
          7
        </button>
        <button onClick={() => this.appendNumber('8')} data-number>
          8
        </button>
        <button onClick={() => this.appendNumber('9')} data-number>
          9
        </button>
        <button onClick={() => this.chooseOperation('-')} data-operation>
          -
        </button>
        <button onClick={() => this.appendNumber('.')} data-number>
          .
        </button>
        <button onClick={() => this.appendNumber('0')} data-number>
          0
        </button>
        <button onClick={this.compute} data-equals className="span-two">
          =
        </button>
      </div>
    );
  }
}

export default App;
