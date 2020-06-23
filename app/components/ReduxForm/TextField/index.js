import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Input, InputLabel } from '@material-ui/core'
import { FormControl, FormHelperText } from '@material-ui/core'
import { Field } from 'redux-form/immutable'
import FormHelperTextSpace from '../FormHelperTextSpace'

const styles = ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: 0
  },
    bootstrapFormLabel: {
        top: -7,
        left: 22,
        fontSize: 15,
        zIndex: 9,
        color: '#aaaaaa',
    },
    shrink : {
       display: 'none',
    },
    bootstrapRoot: {
        padding: 0,
        'label + &': {
            marginTop: 0,
            height: 50,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        border: '1px solid #ced4da',
        fontSize: 15,
        height: 48,
        padding: '0 22px',
        '&:focus': {
            borderColor: '#D3D3D3',
            background: '#FFFADF',
        },
    },
    helperText:{
        marginBottom: 7,
        marginTop: 3,
        height: 10,
    }
})

const ComposedTextField = ({input, classes, meta: {touched, error}, label, ...props}) => {
  return (
      <FormControl className={classes.formControl} error aria-describedby={`${input.name}-field`}>
        <InputLabel htmlFor={`id-${input.name}`} error={!!touched && !!error}
                    FormLabelClasses={{
                        root: classes.bootstrapFormLabel,
                        focused: classes.focused,
                    }}
                    classes={{
                        shrink: classes.shrink,
                    }}
        >{label}</InputLabel>
        <Input id={`id-${input.name}`} error={!!error && !!touched}
               classes={{
                        root: classes.bootstrapRoot,
                        input: classes.bootstrapInput,
                        }}
               disableUnderline={true}
               {...input} {...props}/>
        {touched && error ? (
          <FormHelperText error={!!touched && !!error} id={`${input.name}-field`}  className={classes.helperText}>{error}</FormHelperText>
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