import Validator from './validator'

export default class MinLength extends Validator {
  constructor (field, config = {}) {
    super(field, config)
    const {minLength = 3} = config
    this.type = 'min_length'
    this.messageValues = {
      values: {minLength}
    }
  }

  getError (data) {
    const config = this.getConfig()
    const {minLength = 3} = config
    const name = this.getField()

    if (data[name] !== undefined && data[name] !== '' && data[name].length < minLength) {
      return this.getMessage()
    }
    return undefined
  }
}
