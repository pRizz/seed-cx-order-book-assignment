import _ from 'lodash'
import shortid from 'shortid'
const orderBucketSize = 200

function generateOrderBuckets({ orders }) {
  const buckets = []
  const bucketCount = Math.trunc(orders.length / orderBucketSize) + 1
  for(let i = 0; i < bucketCount; ++i) { // test
    const bucketContents = orders.slice(i * orderBucketSize, (i + 1) * orderBucketSize)
    const price = _.meanBy(bucketContents, order => order.price)
    const size = _.sumBy(bucketContents, order => order.size)
    buckets.push({
      price,
      size,
      orders: bucketContents,
      _key: shortid.generate()
    })
  }
  return buckets
}

export default class OrderBookViewModel {
  constructor({ orderBook }) {
    this.descendingAskBuckets = generateOrderBuckets({ orders: orderBook.descendingAsks })
    this.descendingBidBuckets = generateOrderBuckets({ orders: orderBook.descendingBids })
  }
}