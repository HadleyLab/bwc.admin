import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'

const ButtonContainer = styled.div`
    width: 100%;
`
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        margin: '.5em 0',
    },
    button: {
        width: '100%',
        textTransform: 'none',
        padding: '15px 17px',
    },
    root: {
        boxShadow: 'none',
        position:'relative'
    },
});

const ContainedButton = ({classes,children, name, error, ...props}) => (
    <ButtonContainer>
        <Button variant="contained" className={classes.button} {...props}
                classes={{root: classes.root,}}>
            {children}
        </Button>
    </ButtonContainer>
)


ContainedButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButton);