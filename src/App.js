import React, { Component } from 'react';
import './App.css';
import CoinbaseOrderBookSubscriber from './utils/CoinbaseOrderBookSubscriber'
import OrderBook from './models/OrderBook'
import OrderBookTable from './components/OrderBookTable'
import 'bulma/css/bulma.min.css'

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
      <div className="App container">
        <OrderBookTable orderBook={this.state.orderBook}/>
      </div>
    );
  }
}

export default App;
