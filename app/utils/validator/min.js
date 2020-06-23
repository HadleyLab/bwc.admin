import Validator from './validator'

export default class Min extends Validator {
  constructor (field, config = {}) {
    super(field, config)
    this.type = 'min'
  }

  getError (data) {
    const {min} = this.getConfig()
    const name = this.getField()

    if (data[name] !== undefined && min !== undefined && data[name] < min) {
      return this.getMessage()
    }
    return undefined
  }
}
