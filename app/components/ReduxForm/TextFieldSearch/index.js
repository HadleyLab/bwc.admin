import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Input, InputLabel } from '@material-ui/core'
import { FormControl, FormHelperText } from '@material-ui/core'
import { Field } from 'redux-form/immutable'
import FormHelperTextSpace from '../FormHelperTextSpace'
import TextField from '@material-ui/core/TextField'
import colors from '../../../style/colors'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
      width: '100%',
      margin: 0,
  },

    cssUnderline: {
        '&:after': {
            boxShadow: 'none !important',
            borderBottomColor: 'transparent !important',
            top: 0,
            bottom: 'auto',
        },
        '&:before': {
            borderBottomColor: 'transparent !important',
            top: 0,
            bottom: 'auto',
        },
        '&:hover': {
            boxShadow: 'none !important',
            borderBottomColor: 'transparent !important',
        },
    },
    bootstrapFormLabel: {
        position: 'absolute',
        color: '#8484A3',
        top: '-14px',
        fontSize: 15,
        zIndex: 2,
        fontFamily: "Open Sans",
        marginLeft: '1em',
    },
    focused: {
        color: '#8484A3 !important',
    },
    shrink : {
      display:'none',
    },
    bootstrapRoot: {
        padding: 0,
        'label + &': {
            marginTop: 0,
            height: 36,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        background: colors.tableGrey,
        fontSize: 14,
        color: '#3C3C56',
        height: 36,
        padding: '0 70px 0 12px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '&:focus': {
            background: '#D9DCEA',
        },
    },

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
        <Input id={`id-${input.name}`} error={!!error && !!touched} classes={{
            root: classes.bootstrapRoot,
            input: classes.bootstrapInput,
            underline: classes.cssUnderline,
        }}{...input} {...props}/>

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