import Validator from './validator'

export default class IsString extends Validator {
  constructor (field, config = {}) {
    super(field, config)
    this.setType('string')
  }

  getError (data) {
    const name = this.getField()
    if (data[name] && typeof data[name] !== 'string') {
      return this.getMessage()
    }
    return undefined
  }
}
