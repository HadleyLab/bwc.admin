import trans from 'trans'
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Close from '../Img/ico-Close.svg'
import colors from "../../style/colors";
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    modalBack: {
        backgroundColor: 'rgba(2, 206, 117, 0.96)',
        backdropFilter: 'blur(2.3px)',
        width: '100%',
        height: 62,
        position: 'absolute',
        bottom: 0,
        zIndex: '10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
        marginTop: '0.5em',
        color: colors.white,
    },
    iconButton:{
        position: 'absolute',
        right: 20,
        width: '35px',
        height: '35px',
        fontSize: 10,
        background: 'transparent',
        boxShadow: 'none',
        color: 'rgba(225,225,225, 0.9)',
        '&:hover':{
            color: '#fff',
            background: 'transparent',
        },
        '&:active':{
            color: '#fff',
            background: 'transparent',
            boxShadow: 'none',
        },
    },
    container:{
        width: '100%',
    }

};

class Notification extends React.Component {

    render() {
        const { classes, show, onClose, children} = this.props;

        return (
            show &&
            <div className={classes.modalBack}>
                <div className={classes.container}>
                    <Button  variant="fab" className={classes.iconButton} onClick={onClose}>
                        <div className="icon-ico-Close"/>
                    </Button>
                    <h3 className={classes.title}>
                        {children}
                    </h3>
                </div>
            </div>
        );
    }
}

Notification.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles))(Notification);
