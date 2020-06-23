import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import { FormControl, FormControlLabel, FormHelperText } from '@material-ui/core'
import { Field } from 'redux-form/immutable'
import FormHelperTextSpace from '../FormHelperTextSpace'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
})

const ComposedCheckBox = ({input, color, classes, meta: {touched, error}, label, ...props}) => {
  color = color || 'primary'
  return (
    <FormControl className={classes.formControl} error aria-describedby={`${input.name}-checkbox`}>
      <FormControlLabel
        control={
          <Checkbox
            checked={input.value}
            onChange={input.onChange}
            value={input.name}
            color={color}
          />
        }
        label={label}
      />
      {touched && error ? (
        <FormHelperText error={!!touched && !!error} id={`${input.name}-checkbox`}>{error}</FormHelperText>
      ) : (
        <FormHelperTextSpace/>
      )}
    </FormControl>
  )
}
const FormField = (props) => {
  return (
    <Field component={ComposedCheckBox} {...props}/>
  )
}

ComposedCheckBox.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FormField)