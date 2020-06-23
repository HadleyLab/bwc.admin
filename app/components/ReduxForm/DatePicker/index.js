import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import DatePicker from 'components/material-ui-pickers/DatePicker'
import { FormControl, FormHelperText } from '@material-ui/core'
import { Field } from 'redux-form/immutable'
import moment from 'moment'
import FormHelperTextSpace from 'components/ReduxForm/FormHelperTextSpace'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
})

const ComposedTextField = ({input, classes, meta: {touched, error}, label, ...props}) => {
  const onChange=(date)=>{
    input.onChange(moment(date).format('YYYY-MM-DD'))
  }
  const value = moment(input.value)
  return (
    <FormControl className={classes.formControl} error aria-describedby={`${input.name}-date`}>
      <DatePicker
        id={`id-${input.name}`} error={!!touched && !!error} {...input} onChange={onChange} value={value}
        label={label}
        autoOk
        format="MM/DD/YYYY"
        invalidDateMessage=""
        invalidLabel=""
        {...props}
      />
      {touched && error ? (
        <FormHelperText error={!!touched && !!error} id={`${input.name}-date`}>{error}</FormHelperText>
      ):(
        <FormHelperTextSpace />
      )}
    </FormControl>
  )
}
const FormField = (props) => {
  return (
    <Field component={ComposedTextField} {...props}/>
  )
}

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FormField)