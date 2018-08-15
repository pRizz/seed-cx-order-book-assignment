import React from 'react'
import { Table } from 'bloomer'

function createAskRows(asks) {
  const askRows = []
  for(let ask of asks) {
    if(!ask) { continue }
    askRows.push(<tr key={ask._key}><td style={{color: 'red'}}>${ask.price}</td><td>{ask.size}</td></tr>)
  }
  return askRows
}

function createBidRows(bids) {
  const bidRows = []
  for(let bid of bids) {
    if(!bid) { continue }
    bidRows.push(<tr key={bid._key}><td style={{color: 'green'}}>${bid.price}</td><td>{bid.size}</td></tr>)
  }
  return bidRows
}

export default function OrderBookTable(props) {
  const { orderBook } = props
  return (
    <div className={'columns'}>
      <div className={'column'}>
        <Table isStriped className={'box has-text-centered'}>
          <thead>
          <tr>
            <td colSpan="2">BTC/USD</td>
          </tr>
          <tr>
            <td>Price</td><td>Size</td>
          </tr>
          </thead>
          <tbody>
          {createAskRows(orderBook.descendingAsks)}
          <tr><td colSpan="2">Midpoint Price</td></tr>
          {createBidRows(orderBook.descendingBids)}
          </tbody>
        </Table>
      </div>
    </div>
  )
}