import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Input, InputLabel } from '@material-ui/core'
import { FormControl, FormHelperText } from '@material-ui/core'
import { Field } from 'redux-form/immutable'
import FormHelperTextSpace from '../FormHelperTextSpace'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        width: '100%',
    },
    formLabel:{
        zIndex: 2,
        padding: '10px 30px',
        color: '#9497A2',
        fontSize: 15,
    },
    bootstrapFormLabel: {
        position: 'absolute',
        top: -4,
        fontSize: 15,
        zIndex: 2,
        fontFamily: "Open Sans",
        marginLeft: '1em',
        color: '9497A2',
    },
    focused: {
        color: '#9497A2 !important',
    },
    shrink : {
        transform: 'translate(0, 10px) scale(0.75)',
        color: '#aaaaaa',
    },
    bootstrapRoot: {
        padding: 0,
        'label + &': {
            marginTop: 0,
            height: 55,
            background: '#fff',
            borderRadius: 4,
        },
    },
    bootstrapInput: {
        fontSize: 15,
        borderRadius: 4,
        height: '40px',
        padding: '15px 12px 0',
        '&:focus': {
            borderColor: '#96C7E5',
        },
    },
    helperText:{
        marginBottom: 8,
        marginTop: 4,
        height: 16,
    }
})

const ComposedTextField = ({input, classes, meta: {touched, error}, label, ...props}) => {
    return (
        <FormControl className={classes.formControl} error aria-describedby={`${input.name}-field`} >
            <InputLabel htmlFor={`id-${input.name}`} error={!!touched && !!error}
                        FormLabelClasses={{
                            root: classes.bootstrapFormLabel,
                            focused: classes.focused,
                        }}
                        classes={{
                            shrink: classes.shrink,
                        }}
            >{label}</InputLabel>
            <Input id={`id-${input.name}`} error={!!error && !!touched} {...input} {...props}
                   classes={{
                       root: classes.bootstrapRoot,
                       input: classes.bootstrapInput,
                   }}
            />
            {touched && error ? (
                <FormHelperText error={!!touched && !!error} id={`${input.name}-field`} className={classes.helperText}>{error}</FormHelperText>
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