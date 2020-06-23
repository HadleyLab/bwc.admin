import React from 'react'
import { reduxForm } from 'redux-form/immutable'

export default (form, validate, ...data) => (component) => reduxForm({form, validate, ...data})(component)

