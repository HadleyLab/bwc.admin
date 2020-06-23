import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width:'100%',
    height:'1em',
    marginTop:4
  },
})

const FormHelperTextSpace = (props) => (<div className={props.classes.root}/>)

FormHelperTextSpace.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FormHelperTextSpace)