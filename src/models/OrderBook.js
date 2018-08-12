export default class OrderBook {
  constructor() {
    this.bids = {}
    this.asks = {}
  }

  provideSnapshot({ snapshot }) {
    this.bids = {}
    this.asks = {}
    snapshot.bids.forEach((bidTuple) => {
      const [price, size] = bidTuple
      this.bids[price] = size
    })
    snapshot.asks.forEach((askTuple) => {
      const [price, size] = askTuple
      this.asks[price] = size
    })
  }

  provideL2Update({ l2update }) {
    l2update.changes.forEach((changeTuple) => {
      const [side, price, size] = changeTuple
      switch(side) {
        case 'buy':
          if(size === '0') {
            delete this.bids[price]
            break
          }
          this.bids[price] = size
          break
        case 'sell':
          if(size === '0') {
            delete this.asks[price]
            break
          }
          this.asks[price] = size
          break
        default:
          break // log error
      }
    })
  }
}