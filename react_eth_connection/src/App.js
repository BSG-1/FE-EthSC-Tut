import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    //initializing instance of web3 injection --> this contains the Application Binary Interface (ABI)[an array of objects containing the bones of our smart contract]
    const MyContract = window.web3.eth.contract([
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
      ContractInstance: MyContract.at('0xd0036e5c3e54958d0dfa509303c0f5b9f2345771')
    }
    //binding the querySecret
    this.querySecret = this.querySecret.bind(this);
    this.queryContractState = this.queryContractState.bind(this);
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
      </div>
    );
  }
}

export default App;
