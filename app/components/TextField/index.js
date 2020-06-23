import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from '@material-ui/core/Form'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
})

const ComposedTextField = ({classes,label, name, error, ...props}) => (
  <FormControl className={classes.formControl} error aria-describedby={`${name}-error-text`}>
    <InputLabel htmlFor={`id-${name}`} error={!!error}>{label}</InputLabel>
    <Input id={`id-${name}`} error={!!error} name={name} {...props}/>
    {error && (
      <FormHelperText error={!!error} id={`${name}-error-text`}>{error}</FormHelperText>
    )}
  </FormControl>
)

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ComposedTextField)