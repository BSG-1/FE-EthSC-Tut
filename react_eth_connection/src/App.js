import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    //initializing instance of web3 injection --> this contains the Application Binary Interface (ABI)[an array of objects containing the bones of our smart contract]
    const MyContract = window.web3.eth.contract([
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "result",
            "type": "bool"
          }
        ],
        "name": "ExperimentComplete",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "setExperimentInMotion",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newState",
            "type": "string"
          }
        ],
        "name": "setState",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getSecret",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getState",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "pseudoRandomResult",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "you_awesome",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]);

    this.state = {
      //creates a component state property that holds the address of the smart contract
      ContractInstance: MyContract.at('0xfa9ca5765a0e398d3ecf2b84b84293524dd8c244'),
      contractState: ''
    }
    //binding
    this.querySecret = this.querySecret.bind(this);
    this.queryContractState = this.queryContractState.bind(this);
    this.handleContractStateSubmit = this.handleContractStateSubmit.bind(this);
    this.queryConditionResult = this.queryConditionResult.bind(this);
    this.activateExperiment = this.activateExperiment.bind(this);
  }

  querySecret() {
    const { getSecret } = this.state.ContractInstance;

    getSecret((err, secret) => {
      if (err) console.error('An error occurred::::', err);
      console.log('This is our contract\'s secret::::', secret);
    })
  }

  queryContractState() {
    const { getState } = this.state.ContractInstance;

    getState((err, state) => {
      if (err) console.error('An error occured::::', err);
      console.log('This is our contract\'s state::::', state);
    })
  }

  handleContractStateSubmit(event) {
    event.preventDefault();

    const { setState } = this.state.ContractInstance;
    const { contractState: newState } = this.state;

    setState(
      newState,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei(0.01, 'ether')
      }, (err, result) => {
        console.log('Please wait, smart contract state is changing...');
      }
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React & Ethereum Frontend Connect</h1>
        </header>
        <br /><br />
        <button onClick={this.querySecret}>Query smart contract's 'Secret'</button>
        <br /><br />
        <button onClick={this.queryContractState}>Query Smart Contract's State</button>
        <br /><br />
        <form onSubmit={this.handleContractStateSubmit}>
          <input
            type="text"
            name="state-change"
            placeholder="Enter new state..."
            value={this.state.contractState}
            onChange={event => this.setState({ contractState: event.target.value })} />
          <button type="submit"> Submit </button>
        </form>
        <br /><br />
        <button onClick={this.queryConditionResult}>Query Smart Contract Conditional Result</button>
        <br /><br />
        <button onClick={this.activateExperiment}>Start Experiment on Smart Contract</button>
      </div>
    );
  }
}

export default App;