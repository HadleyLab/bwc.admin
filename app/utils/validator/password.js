import Validator from './validator'
import Required from './required'
import MinLength from './minLength'
import Equal from './equal'

export default class Password extends Validator {
  constructor (config) {
    super('password', config)
    let {fields, minSize, messages} = config
    this.required = {
      currentPassword: new Required(fields.currentPassword, {messages}),
      newPassword: new Required(fields.newPassword, {messages}),
      newPasswordConfirmation: new Required(fields.newPasswordConfirmation, {messages})
    }
    this.min = new MinLength('newPassword', {minLength: minSize, messages})
    this.equal = new Equal('newPasswordConfirmation', {equalField: 'newPassword', messages})
  }

  addError (errors, data) {
    const {fields} = this.config
    if (data[fields.currentPassword] ||
      data[fields.newPassword] ||
      data[fields.newPasswordConfirmation]) {
      errors = this.required.currentPassword.addError(errors, data)
      errors = this.required.newPassword.addError(errors, data)
      errors = this.required.newPasswordConfirmation.addError(errors, data)
      errors = this.min.addError(errors, data)
      errors = this.equal.addError(errors, data)
    }
    return errors
  }

}
