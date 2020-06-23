import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FormHelperText } from '@material-ui/core'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
})

const ErrorText = ({classes, children}) => (
  <FormHelperText className={classes.root} error={!!children}>{children}</FormHelperText>
)

ErrorText.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ErrorText)