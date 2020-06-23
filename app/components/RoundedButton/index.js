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
        margin: '1em 0',
    },
    button: {
        fontWeight: 'normal',
        textTransform: 'none',
        padding: '16px 35px 17px',
        margin: '1.5em 0',
        marginTop: '3em',
        borderRadius: 33,
        background: '#54BFFF',
        '&:hover':{
            background: '#65B1DE',
        }
    },
    root: {
        boxShadow: 'none',
        position:'relative'
    },
});

const RoundedButton = ({classes,children, name, error, ...props}) => (
    <div style={styles.container}>
        <Button variant="contained" className={classes.button} {...props}
                classes={{root: classes.root,}}>
            {children}
        </Button>
    </div>
)


RoundedButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoundedButton);