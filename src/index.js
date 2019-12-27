import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '0',
			savedInput: '',
			savedOperator: '',
			lastInputIsOperator: false
		}
		this.updateInput = this.updateInput.bind(this);
		this.clear = this.clear.bind(this);
		this.performOperation = this.performOperation.bind(this);
		this.handleNegativeSign = this.handleNegativeSign.bind(this);
	}

	updateInput(event) {
		const value = event.target.value.toString();
		if (value === '-') {
			this.setState({
				input: value,
				lastInputIsOperator: false
			});
		} else if (value === '.') {
			if (!this.state.input.includes('.')) {
				this.setState(state => ({
					input: state.input + value,
					lastInputIsOperator: false
				}));
			}
		} else if (value === '0') {
			if (this.state.input !== '0') {
				this.setState(state => ({
					input: state.input + value,
					lastInputIsOperator: false
				}));
			}
		} else {
			if (this.state.input === '0') {
				this.setState({
					input: value,
					lastInputIsOperator: false
				});
			} else {
				this.setState(state => ({
					input: state.input + value,
					lastInputIsOperator: false
				}));
			}
		}
	}

	clear() {
		this.setState({
			input: '0',
			savedInput: '',
			savedOperator: ''
		});
	}

	handleNegativeSign(event) {
		if (this.state.lastInputIsOperator) {
			this.updateInput(event);
		} else {
			this.performOperation(event);
		}
	}

	performOperation(event) {
		const operator = event.target.value;

		if (this.state.input === '-') {
			this.setState({
				input: '0',
				savedOperator: '',
				lastInputIsOperator: true
			});
		} else if (this.state.lastInputIsOperator) {
			this.setState({
				savedOperator: '',
				lastInputIsOperator: true
			});
		} else if (this.state.savedInput !== '') {
			if (this.state.savedOperator === '+') {
				this.add();
			} else if (this.state.savedOperator === '-') {
				this.subtract();
			} else if (this.state.savedOperator === '*') {
				this.multiply();
			} else if (this.state.savedOperator === '/') {
				this.divide();
			}
		} else if (operator !== '=') {
			this.setState(state => ({
				savedInput: state.input,
				input: '0',
				lastInputIsOperator: true
			}));
		}

		if (operator === '=' && this.state.savedInput !== '') {
			this.setState(state => ({
				input: state.savedInput,
				savedInput: '',
				savedOperator: '',
				lastInputIsOperator: false
			}));
		} else if (operator !== '=') {
			this.setState(state => ({
				savedOperator: operator,
				lastInputIsOperator: true
			}));
		}
	}

	add() {
		this.setState(state => ({
			savedInput: (parseFloat(state.savedInput) + parseFloat(state.input)).toString(),
			input: '0'
		}));
	}

	subtract() {
		this.setState(state => ({
			savedInput: (parseFloat(state.savedInput) - parseFloat(state.input)).toString(),
			input: '0'
		}));
	}

	multiply() {
		this.setState(state => ({
			savedInput: (parseFloat(state.savedInput) * parseFloat(state.input)).toString(),
			input: '0'
		}));
	}

	divide() {
		this.setState(state => ({
			savedInput: (parseFloat(state.savedInput) / parseFloat(state.input)).toString(),
			input: '0'
		}));
	}

	render() {
		return (
			<div className="calculator">
				<div id="display">{this.state.input}</div>

				<button onClick={this.clear} id="clear">AC</button>
				<button value="/" onClick={this.performOperation} id="divide">/</button>
				<button value="*" onClick={this.performOperation} id="multiply">*</button>

				<button value="7" onClick={this.updateInput} id="seven">7</button>
				<button value="8" onClick={this.updateInput} id="eight">8</button>
				<button value="9" onClick={this.updateInput} id="nine">9</button>
				<button value="-" onClick={this.handleNegativeSign} id="subtract">-</button>

				<button value="4" onClick={this.updateInput} id="four">4</button>
				<button value="5" onClick={this.updateInput} id="five">5</button>
				<button value="6" onClick={this.updateInput} id="six">6</button>
				<button value="+" onClick={this.performOperation} id="add">+</button>

				<button value="1" onClick={this.updateInput} id="one">1</button>
				<button value="2" onClick={this.updateInput} id="two">2</button>
				<button value="3" onClick={this.updateInput} id="three">3</button>
				<button value="=" onClick={this.performOperation} id="equals">=</button>

				<button value="0" onClick={this.updateInput} id="zero">0</button>
				<button value="." onClick={this.updateInput} id="decimal">.</button>
			</div>
		);
	}
}

ReactDOM.render(<Calculator />, document.getElementById('root'));

serviceWorker.unregister();
