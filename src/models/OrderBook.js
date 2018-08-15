import Order from './Order'

function insertSorted({ orderArray, orderToInsert }) {
  for(let [index, order] of orderArray.entries()) {
    if(!order) { continue }
    if(orderToInsert.price > order.price) {
      orderArray.splice(index, 0, orderToInsert)
      return
    }
  }
  orderArray.push(orderToInsert)
}

function deleteOrderOfPrice({ orders, priceString }) {
  const index = orders.findIndex((order) => order && order.priceString === priceString)
  if(index === -1) { return }
  orders.splice(index, 1)
}

export default class OrderBook {
  constructor() {
    this.descendingBids = []
    this.descendingAsks = []
  }

  provideSnapshot({ snapshot }) {
    this.descendingBids = []
    this.descendingAsks = []
    snapshot.bids.forEach((bidTuple) => {
      const [priceString, sizeString] = bidTuple
      insertSorted({ orderArray: this.descendingBids, orderToInsert: new Order({ priceString, sizeString }) })
    })
    snapshot.asks.forEach((askTuple) => {
      const [priceString, sizeString] = askTuple
      insertSorted({ orderArray: this.descendingAsks, orderToInsert: new Order({ priceString, sizeString }) })
    })
  }

  provideL2Update({ l2update }) {
    l2update.changes.forEach((changeTuple) => {
      const [side, priceString, sizeString] = changeTuple
      switch(side) {
        case 'buy':
          if(sizeString === '0') {
            deleteOrderOfPrice({ orders: this.descendingBids, priceString })
            break
          }
          insertSorted({ orderArray: this.descendingBids, orderToInsert: new Order({ priceString, sizeString }) })
          break
        case 'sell':
          if(sizeString === '0') {
            deleteOrderOfPrice({ orders: this.descendingAsks, priceString })
            break
          }
          insertSorted({ orderArray: this.descendingAsks, orderToInsert: new Order({ priceString, sizeString }) })
          break
        default:
          break // log error
      }
    })
  }
}