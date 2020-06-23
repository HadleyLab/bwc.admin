import Validator from './validator'

export default class Equal extends Validator {
  constructor (field, config = {}) {
    super(field, config)
    this.setType('equal')
  }

  getError (data) {
    const config = this.getConfig()
    const {equalField = ''} = config
    const name = this.getField()
    if (data[name] && data[equalField] && data[name] !== data[equalField]) {
      return this.getMessage()
    }
    return undefined
  }
}
