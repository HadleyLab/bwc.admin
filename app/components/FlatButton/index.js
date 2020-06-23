import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        // margin: '1.5em 0',
    },
    button: {
        fontWeight: 'normal',
        textTransform: 'none',
        padding: '13px 30px 14px',
        borderRadius: 23,
        color: '#8998DF',
        background: 'transparent',
        margin: '1.5em 0',

    },
    root: {
        boxShadow: 'none',
        position:'relative'
    },
});

const FlatButton = ({classes,children, name, error, ...props}) => (
    <div style={styles.container}>
        <Button variant="contained" className={classes.button} {...props}
                classes={{root: classes.root,}}>
            {children}
        </Button>
    </div>
)


FlatButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlatButton);