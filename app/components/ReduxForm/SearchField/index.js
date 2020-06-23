import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { InputLabel } from '@material-ui/core'
import { FormControl, FormHelperText } from '@material-ui/core'
import { Field } from 'redux-form/immutable'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
      width: '100%',
      marginBottom:'1.5em',
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
  cssLabel: {
      top: -7,
      zIndex: 2,
      fontSize: 13,
      fontWeight:100,
      position: 'absolute',
      marginLeft: '2.5em',
      color: '#9497A2',
  },
  cssFocused: {
      opacity:0,
  },
  cssShrink : {
      opacity:0,
      color: '#9497A2',
      transform: 'translate(-40px, 20px) scale(0)',
  },
  bootstrapRoot: {
      padding: 0,
      'label + &': {
          marginTop: 0,
          height: 47,
          background: '#fff',
          borderRadius: 4,
      },
  },
  bootstrapInput: {
      fontSize: 15,
      borderRadius: 4,
      height: 47,
      padding: '0 1em 0 2.5em',
      width: 'calc(100% - 24px)',
      transition: theme.transitions.create(['border-color']),
      '&:focus': {
          borderColor: '#96C7E5',
      },
  },
  iconClear:{
    fontSize:7,
    color:"#626285",
    },
  clearButton:{
      width:19,
      height: 19,
      top:13,
      right: 11,
      position: 'absolute',
      backgroundColor: '#DCDCF1',
      '&:hover':{
          background: '#B7B7D4',
      }
  },
  iconSearch:{
    fontSize: 16,
    color: '#9497A2',

  },
  searchButton:{
      width:28,
      height: 28,
      top: 10,
      left: 6,
      position: 'absolute',
      '&:hover':{
          background: 'transparent',
      }
  },
})

const ComposedSearchField = ({input, classes, label, showCleanBtn, clickclean, ...props}) => {
  return (
    <FormControl className={classes.formControl} aria-describedby={`${input.name}-field`} >
      <InputLabel htmlFor={`id-${input.name}`}
                  FormLabelClasses={{
                      root: classes.cssLabel,
                  }}
                  classes={{
                      shrink: classes.cssShrink,
                  }}
      >{label}</InputLabel>
      <Input id={`id-${input.name}`} {...input} {...props}
             type="search"
             classes={{
                 root: classes.bootstrapRoot,
                 input: classes.bootstrapInput,
                 underline: classes.cssUnderline,
             }}
      />
        <IconButton classes={{root: classes.searchButton,
        label: classes.iconSearch}}><div className="icon-ico-Search"/></IconButton>
        {(showCleanBtn) ?
            (<IconButton classes={{root: classes.clearButton,label: classes.iconClear}} onClick={clickclean}><div className="icon-ico-Close"/></IconButton>)
            : null
        }                
    </FormControl>

  )
}
const SearchField = (props) => {
  return (
    <Field component={ComposedSearchField} {...props}/>
  )
}

ComposedSearchField.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SearchField)