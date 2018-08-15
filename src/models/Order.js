import shortid from 'shortid'

export default class Order {
  constructor({ priceString, sizeString }) {
    this.priceString = priceString
    this.sizeString = sizeString
    this.price = parseFloat(priceString)
    this.size = parseFloat(sizeString)
    this._key = shortid.generate()
  }
}