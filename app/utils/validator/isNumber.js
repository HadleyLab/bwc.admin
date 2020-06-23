import Validator from './validator'

export default class IsNumber extends Validator {
  constructor (field, config = {}) {
    super(field, config)
    this.setType('number')
  }

  getError (data) {
    const name = this.getField()
    if (data[name] && typeof data[name] !== 'number') {
      return this.getMessage()
    }
    return undefined
  }
}
