import { SubmissionError } from 'redux-form/immutable'
import _ from 'lodash'
import trans from '../trans'

export default (response) => {
  if (!(response && response.status === 200)) {
    const errors = {}
    const details = _.get(response, 'data.details')
    if (typeof details === 'object') {
      for (const key of Object.keys(details)) {
        if (key === 'error') {
          errors._error = trans(`validation.joi.submission.${key}.${details[key].message}`, {value: details[key].value})
        } else {
          errors[key] = trans(`validation.joi.submission.${key}.${details[key].message}`, {value: details[key].value})
        }
      }
    }
    throw new SubmissionError(errors)
  } else {
    return Promise.resolve(response)
  }
}
