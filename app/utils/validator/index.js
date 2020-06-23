export default class Validation {
  constructor (validators) {
    this.validators = validators
    this.errors = {}
    this.data = {}
  }

  getErrors (data) {
    this.errors = {}
    this.data = data
    for (const validator of this.validators) {
      this.errors = validator.addError(this.errors, data)
    }
    return this.errors
  }

  isValid (data) {
    let errors = this.getErrors(data)
    return Object.keys(errors).length === 0
  }
}
