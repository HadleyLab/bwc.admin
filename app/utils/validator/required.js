import Validator from './validator'

export default class Required extends Validator {
  getError (data) {
    return (
      data[this.getField()] === undefined ||
      data[this.getField()] === '' ||
      data[this.getField()] === null)
      ? this.getMessage() : undefined
  }
}
