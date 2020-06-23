import trans from 'trans'
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Close from '../../../../../components/Img/ico-Close.svg'
import colors from "../../../../../style/colors";
import PropTypes from 'prop-types'
import ContainedButton from 'components/ContainedButton'
import { withStyles } from '@material-ui/core/styles'

const styles = ({
    modalBack: {
        backgroundColor: 'rgba(223, 223, 238, 0.9)',
        backdropFilter: 'blur(2.3px)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: '10',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        textAlign: 'center',
        fontWeight: '300',
        fontSize: '2em',
        marginTop: '0.5em',
    },
    contentCover: {
        maxWidth: '100%',
        display: 'flex',
        flexFlow: 'column',
        textAlign: 'center',
    },
    btnRoot: {
        width: '118px',
        height: '54px',
        margin: '1em auto',
        textTransform: 'none',
        color: colors.white,
        fontSize: '1em',
        background: 'rgba(229, 8, 44, 0.7)',
        boxShadow:'none',
        '&:hover':{
            background: 'rgba(229, 8, 44, 0.9)',
            boxShadow:'none',
        },
        '&:active':{
            background: 'rgba(229, 8, 44, 0.9)',
            boxShadow:'none',
        },
    },
    buttonRef: {
        width: '220px',
        height: '54px',
        margin: '1em auto',
        textTransform: 'none',
        color: colors.white,
        fontSize: '1em',
        background: 'rgba(229, 8, 44, 0.7)',
        boxShadow:'none',
        '&:hover':{
            background: 'rgba(229, 8, 44, 0.9)',
            boxShadow:'none',
        },
        '&:active':{
            background: 'rgba(229, 8, 44, 0.9)',
            boxShadow:'none',
        },
    },
    topBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '2em',
        width: '100%',
    },
    bottomBar: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '1em',
        width: '100%',
    },
    topCenter: {
        textAlign: 'center',
        flex: 1,
    },
    iconButton:{
        width: '40px',
        height: '40px',
        background: 'rgba(255, 255, 255, 0.7)',
        boxShadow: '0 0 10px 0 rgba(21, 21, 49, 0.16)',
        '&:hover':{
            background: 'rgba(255, 255, 255, 0.9)',
        },
        '&:active':{
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 0 10px 0 rgba(21, 21, 49, 0.25)',
        },
    },
    close: {
        width: '8px',
        height: '8px',
        backgroundImage: `url(${Close})`,
        backgroundPosition: 'center',

    },
    flexedRow: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        flex: 1,
    },
    flexedColumn: {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    flexedRowRight: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flex: 1,
    },
    pDicoms:{
        color: 'rgba(35, 35, 77, 0.6)',
        fontSize: 14,
        textAlign: 'center',
    },
    linkButton: {
        background: 'transparent',
        textTransform: 'none',
        color: '#6d6d9b',
        fontSize: 14,
        boxShadow: 'none',
        '&:hover':{
            background: 'transparent',
            boxShadow: 'none',
            color: colors.activeMenu,
        },
        '&:active':{
            background: 'transparent',
            boxShadow: 'none',
            color: colors.activeMenu,
        },
        cover:{
            margin: '2em',
            padding: 15,
            border: '1px solid red',
        },
    },
    dicomName:{
        color:'rgba(35, 35, 77, 0.6)',
        fontSize: 18,
        margin: '30px 0',
        fontWeight: 100,
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

});

class AlertDialog extends React.Component {

    render() {

        const { classes, history, showD, handleCloseDialog, confirmDeleteHospital, idHospital, redefinition, nameActiveHospital} = this.props;

        return (showD &&
            <div className={classes.modalBack}>
                <div className={classes.topBar}>
                    <Button  variant="fab" className={classes.iconButton} onClick={handleCloseDialog}>
                        <div className={classes.close}/>
                    </Button>
                </div>

                {(redefinition)
                    ? (
                        <div className={classes.contentCover}>
                            <h3 className={classes.title}>{trans('admin.panel.hospitals.action.del.alert.redefinition')}</h3>
                            <h4 className={classes.dicomName}>{nameActiveHospital}</h4>
                            <Button onClick={() => history.push(`/redefinition/hospital/${idHospital}`)} variant="contained" className={classes.buttonRef} autoFocus>
                                {trans('admin.panel.hospitals.action.redefinition')}
                            </Button>
                        </div>
                    )
                    : (
                        <div className={classes.contentCover}>
                            <h3 className={classes.title}>{trans('admin.panel.hospitals.action.del.alert.text')}</h3>
                            <h4 className={classes.dicomName}>{nameActiveHospital}</h4>
                            <ContainedButton onClick={() => confirmDeleteHospital(idHospital)} variant="contained" classes={{root:classes.btnRoot}} autoFocus>
                                {trans('admin.panel.hospitals.action.delete')}
                            </ContainedButton>
                        </div>
                    )
                }
                <div className={classes.bottomBar}>
                    <Button onClick={handleCloseDialog} className={classes.linkButton} variant="contained">
                        {trans('admin.panel.DICOMs.assign.dialog.cancel')}
                    </Button>
                </div>
            </div>
        );
    }
}
AlertDialog.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles))(AlertDialog);