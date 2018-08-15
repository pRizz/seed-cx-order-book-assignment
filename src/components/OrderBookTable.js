import React from 'react'
import { Table } from 'bloomer'

export default class OrderBookTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentlyExpandedAskIndex: null,
      currentlyExpandedBidIndex: null
    }
  }

  render() {
    const { orderBookViewModel } = this.props
    return (
      <div className={'columns'}>
        <div className="column is-one-third is-offset-one-third">
          <Table isStriped className={'box'}>
            <thead>
            <tr>
              <td colSpan="2">ETH/USD</td>
            </tr>
            <tr>
              <td>Price</td><td>Size</td>
            </tr>
            </thead>
            <tbody>
            {this.createTopLevelAskRows(orderBookViewModel.descendingAskBuckets)}
            <tr><td colSpan="2">Midpoint Price: ${orderBookViewModel.midpointPrice}</td></tr>
            {this.createTopLevelBidRows(orderBookViewModel.descendingBidBuckets)}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }

  createTopLevelAskRows(askBuckets) {
    const askRows = []
    for(let [index, askBucket] of askBuckets.entries()) {
      askRows.push(<tr onClick={() => this.askRowClicked(index) }><td style={{color: 'red'}}>${askBucket.price}</td><td>{askBucket.size} ▾</td></tr>)
      if(this.state.currentlyExpandedAskIndex === index) {
        for(let order of askBucket.orders) {
          askRows.push(<tr onClick={() => this.askRowClicked(index) }><td style={{color: 'red'}}>${order.price}</td><td>{order.size}</td></tr>)
        }
      }
    }
    return askRows
  }

  createTopLevelBidRows(bidBuckets) {
    const bidRows = []
    for(let [index, bidBucket] of bidBuckets.entries()) {
      bidRows.push(<tr onClick={() => this.bidRowClicked(index) }><td style={{color: 'green'}}>${bidBucket.price}</td><td>{bidBucket.size} ▾</td></tr>)
      if(this.state.currentlyExpandedBidIndex === index) {
        for(let order of bidBucket.orders) {
          bidRows.push(<tr onClick={() => this.bidRowClicked(index) }><td style={{color: 'green'}}>${order.price}</td><td>{order.size}</td></tr>)
        }
      }
    }
    return bidRows
  }

  askRowClicked(bucketIndex) {
    if(this.state.currentlyExpandedAskIndex === bucketIndex) {
      this.setState({ currentlyExpandedAskIndex: null })
      return
    }

    this.setState({ currentlyExpandedAskIndex: bucketIndex })
  }

  bidRowClicked(bucketIndex) {
    if(this.state.currentlyExpandedBidIndex === bucketIndex) {
      this.setState({ currentlyExpandedBidIndex: null })
      return
    }

    this.setState({ currentlyExpandedBidIndex: bucketIndex })
  }
}
