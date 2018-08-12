import EventEmitter from 'events'

function coinbaseMessageHandler(message) {
  const coinbaseData = JSON.parse(message.data)
  switch(coinbaseData['type']) {
    case 'subscriptions':
      break
    case 'error':
      break
    case 'snapshot':
      this.emit('snapshot', coinbaseData)
      break
    case 'l2update':
      this.emit('l2update', coinbaseData)
      break
    default:
      break
  }
}

export default class CoinbaseOrderBookSubscriber extends EventEmitter {
  constructor() {
    super()
    this.webSocket = new WebSocket('wss://ws-feed.pro.coinbase.com')
    this.webSocket.addEventListener('open', () => {
      const subscriptionMessage = JSON.stringify({
        type: 'subscribe',
        product_ids: [
          'ETH-USD',
          'ETH-EUR'
        ],
        channels: [
          'level2',
          'heartbeat',
          {
            name: 'ticker',
            product_ids: [
              'ETH-BTC',
              'ETH-USD'
            ]
          }
        ]
      })
      console.log(`got open`)
      this.webSocket.send(subscriptionMessage)
    })
    this.webSocket.addEventListener('error', () => {
      console.log(`got error`)
    })
    this.webSocket.addEventListener('close', () => {
      console.log(`got close`)

    })
    this.webSocket.addEventListener('message', coinbaseMessageHandler.bind(this))
  }
}