import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'

const styles = theme => ({
    buttonContainer: {
        width: '100%',
    },
    button: {
        width: '100%',
        textTransform: 'none',
        padding: '8px 17px',
        backgroundColor: 'rgba(55, 80, 255, 0.8)',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '100',
        '&:hover': {
            backgroundColor: '#3750ff',
        },
    },
    root: {
        boxShadow: 'none',
        position:'relative'
    },
});

const ContainedButton = ({classes,children, name, error, ...props}) => (
    <div className={classes.buttonContainer}>
        <Button variant="contained" className={classes.button} {...props}
                classes={{root: classes.root,}}>
            {children}
        </Button>
    </div>
)


ContainedButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButton);