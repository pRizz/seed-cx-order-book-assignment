import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CoinbaseOrderBookSubscriber from './utils/CoinbaseOrderBookSubscriber'
import OrderBook from './models/OrderBook'
import OrderBookView from './components/OrderBookView'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orderBook: new OrderBook(),
      orderBookSubscriber: new CoinbaseOrderBookSubscriber()
    }

    this.state.orderBookSubscriber.on('snapshot', (snapshot) => {
      this.state.orderBook.provideSnapshot({ snapshot })
    })
    this.state.orderBookSubscriber.on('l2update', (l2update) => {
      this.state.orderBook.provideL2Update({ l2update })
    })
  }
  
  componentWillMount() {
    console.log('comp will mount')
    setInterval(() => {
      console.log('setting state')
      this.setState({ orderBook: this.state.orderBook })
    }, 2000)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <OrderBookView orderBook={this.state.orderBook}/>
      </div>
    );
  }
}

export default App;
