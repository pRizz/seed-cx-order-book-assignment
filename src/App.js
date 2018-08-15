import React, { Component } from 'react';
import './App.css';
import CoinbaseOrderBookSubscriber from './utils/CoinbaseOrderBookSubscriber'
import OrderBook from './models/OrderBook'
import OrderBookTable from './components/OrderBookTable'
import 'bulma/css/bulma.min.css'
import OrderBookViewModel from "./models/OrderBookViewModel"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orderBook: new OrderBook(),
      orderBookSubscriber: new CoinbaseOrderBookSubscriber()
    }

    this.state.orderBookSubscriber.on('snapshot', (snapshot) => {
      this.state.orderBook.provideSnapshot({ snapshot })
      this.setState({ orderBook: this.state.orderBook })
    })
    this.state.orderBookSubscriber.on('l2update', (l2update) => {
      this.state.orderBook.provideL2Update({ l2update })
      this.setState({ orderBook: this.state.orderBook })
    })
  }

  render() {
    const orderBookViewModel = new OrderBookViewModel({ orderBook: this.state.orderBook })
    return (
      <div className="App container">
        <OrderBookTable orderBookViewModel={orderBookViewModel}/>
      </div>
    );
  }
}

export default App;
