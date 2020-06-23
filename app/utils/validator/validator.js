import React from 'react' // eslint-disable-line
import {FormattedMessage} from 'react-intl'

import {assign} from 'lodash'

class Validator {
  constructor (field, config = {}) {
    this.type = 'required'
    this.field = field
    this.config = config
    this.messageValues = {}
  }

  addError (errors, data) {
    const errorText = this.getError(data)
    if (this.getError(data)) {
      errors[this.getField()] = {errorText}
    }
    return errors
  }

  setType (type) {
    this.type = type
  }

  setMessageValues (obj) {
    this.messageValues = obj
  }

  getConfig () {
    return this.config
  }

  getField () {
    return this.field
  }

  getMessage () {
    const {message, text, messages} = this.config
    if (text) {
      return text
    }
    if (message) {
      return <FormattedMessage {...message} />
    }
    let key = `validation_${this.type}_${this.field}`

    if (messages && messages[key]) {
      let obj = assign({}, messages[key], this.messageValues)
      return <FormattedMessage {...obj} />
    }
    return 'Error'
  }
}

export default Validator
