import React from 'react'

function sortedOrders(orders) {
  const sorted = []
  for(let price in orders) {
    sorted.push(orders[price])
  }
  return sorted.sort((lhs, rhs) => parseFloat(rhs.price) - parseFloat(lhs.price))
}

function createAskRows(asks) {
  asks = sortedOrders(asks)
  const askRows = []
  for(let ask of asks) {
    askRows.push(<tr><td>{ask.price}</td><td>{ask.size}</td></tr>)
  }
  return askRows
}

function createBidRows(bids) {
  bids = sortedOrders(bids)
  const bidRows = []
  for(let bid of bids) {
    bidRows.push(<tr><td>{bid.price}</td><td>{bid.size}</td></tr>)
  }
  return bidRows
}

export default function OrderBookView(props) {
  const { orderBook } = props
  return (
    <div>
      <table>
        <thead>
        <td colSpan="2">
          BTC/USD
        </td>
        </thead>
        <tbody>
        {createAskRows(orderBook.asks)}
        <tr><td colSpan="2">Midpoint Price</td></tr>
        {createBidRows(orderBook.bids)}
        </tbody>
      </table>
    </div>
  )
}