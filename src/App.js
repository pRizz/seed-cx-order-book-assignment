import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CoinbaseOrderBookSubscriber from './utils/CoinbaseOrderBookSubscriber'
import OrderBook from './models/OrderBook'

class App extends Component {
  render() {
    this.orderBookSubscriber = new CoinbaseOrderBookSubscriber()

    this.orderBook = new OrderBook()

    this.orderBookSubscriber.on('snapshot', (snapshot) => {
      this.orderBook.provideSnapshot({ snapshot })
    })
    this.orderBookSubscriber.on('l2update', (l2update) => {
      this.orderBook.provideL2Update({ l2update })
    })

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
