import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Input } from '@material-ui/core'
import { Field } from 'redux-form/immutable'

const styles = theme => ({});

const ComposedHiddenTextField = ({input, meta: {touched, error}, ...props}) => {
  return (
      <Input id={`id-${input.name}`} type={"hidden"} error={!!error && !!touched} {...input} {...props} />
  )
}
const FormField = (props) => {
  return (
    <Field component={ComposedHiddenTextField} {...props}/>
  )
}

ComposedHiddenTextField.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FormField)