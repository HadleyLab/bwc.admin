/* eslint-disable */
import Validator from './validator'

function isEmail (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export default class IsEmail extends Validator {
  constructor (field, config = {}) {
    super(field, config)
    this.setType('email')
  }

  getError (data) {
    const name = this.getField()
    if (data[name] && !isEmail(data[name])) {
      return this.getMessage()
    }
    return undefined
  }
}
