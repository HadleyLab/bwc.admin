import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FormControl, Input, InputLabel, Select, FormHelperText } from '@material-ui/core'
import { Field } from 'redux-form/immutable'
import FormHelperTextSpace from '../FormHelperTextSpace'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl:{
    background: '#fff',
    borderRadius:5,
    marginTop: 0,
   marginBottom:20,
    height:55,
      'label + &': {
        marginTop:0,
      }
  },
  cssFormControl:{
      'label + &': {
          marginTop:0,
      }
  },
  formLabel:{
    top:-5,
    left:16,
    fontWeight: 100,
    color:'#9497A2',
  },
  focusedLabel:{
      color: '#aaaaaa',
      display: 'none',
      transform: 'translate(0, 13px) scale(0.75)',
  },
  shrinkLabel:{
      display: 'none',
      color: '#aaaaaa',
      transform: 'translate(0, 13px) scale(0.75)',
  },
  filled:{
      transform: 'translate(0, 13px) scale(0.75)',
  },
  selectRoot:{
      marginTop:-7,
      'label + &': {
          marginTop:0,
      }
  },
    helperText:{
        marginBottom: -14,

        height: 10,
    },
  cssSelect:{
    textAlign:'left',
    padding: '10px 16px 0',
      'label + &':{
          marginTop:0,
      }
    },
    inputRoot: {
        padding: 0,
        'label + &': {
            marginTop: 3,
            height: 50,
            lineHeight: '48px',

        },
    },
    cssInput: {
        fontSize: 15,
        padding: '0 16px',
        '&:focus': {
        },
    },
    cssAnimate:{
      display: 'none'
    }
})

const ComposedSelectField = ({classes, children, label, meta: {touched, error}, name, input, focused, ...props}) => {

    return (
        <FormControl className={classes.formControl} aria-describedby={`${name}-date`}>
            <InputLabel htmlFor={`id-${name}`}
                        FormLabelClasses={{
                            root: classes.formLabel,
                            focused: classes.focusedLabel,
                            filled: classes.filled,

                        }}
                        classes={{
                            shrink: classes.shrinkLabel,

                        }}
                        focused={focused}
            >{label}</InputLabel>
            <Select
                input={
                    <Input
                        name="name"
                        id={`id-${name}`}
                        disableUnderline={true}
                        {...input} {...props}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.cssInput,
                        }}
                        />
                    }

            >
                {children}
            </Select>
            {touched && error ? (
                <FormHelperText error={!!touched && !!error} id={`${input.name}-date`}  className={classes.helperText}>{error}</FormHelperText>
            ):(
                <FormHelperTextSpace />
            )}
        </FormControl>

    )
}

const FormField = (props) => {
    return (
        <Field component={ComposedSelectField} {...props}/>
    )
}

ComposedSelectField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormField);