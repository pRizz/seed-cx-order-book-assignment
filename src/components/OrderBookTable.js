import React from 'react'
import { Table } from 'bloomer'

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
    askRows.push(<tr><td style={{color: 'red'}}>${ask.price}</td><td>{ask.size}</td></tr>)
  }
  return askRows
}

function createBidRows(bids) {
  bids = sortedOrders(bids)
  const bidRows = []
  for(let bid of bids) {
    bidRows.push(<tr><td style={{color: 'green'}}>${bid.price}</td><td>{bid.size}</td></tr>)
  }
  return bidRows
}

export default function OrderBookTable(props) {
  const { orderBook } = props
  return (
    <div className={'columns'}>
      <div className={'column is-half is-offset-one-quarter'} >
        <Table isStriped className={'box has-text-centered'} style={{width: '100%', margin: 'auto'}}>
          <thead>
          <tr>
            <td colSpan="2">BTC/USD</td>
          </tr>
          <tr>
            <td>Price</td><td>Size</td>
          </tr>
          </thead>
          <tbody>
          {createAskRows(orderBook.asks)}
          <tr><td colSpan="2">Midpoint Price</td></tr>
          {createBidRows(orderBook.bids)}
          </tbody>
        </Table>
      </div>
    </div>
  )
}