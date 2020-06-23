import React from 'react';
import trans from 'trans'
import Button from '@material-ui/core/Button';
import FullColumn from 'components/FullColumn';
import TextField from 'components/ReduxForm/TextFieldBig'
import ErrorText from 'components/ErrorText'
import reduxForm from 'hocs/reduxForm'
import formReducer from './reducer'
import { compose } from 'redux'
import injectReducer from 'utils/injectReducer'
import Close from '../../../../../components/Img/ico-Close.svg'
import colors from "../../../../../style/colors";
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = {
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
        margin: '0 auto 1.5em',
    },
    contentCover: {
        maxWidth: '100%',
        width: 500,
        display: 'flex',
        flexFlow: 'column',
        textAlign: 'center',
    },
    button: {
        width: '118px',
        height: '54px',
        margin: '1em auto',
        textTransform: 'none',
        fontSize: '1em',
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
    },
    dicomName:{
        color:'rgba(35, 35, 77, 0.6)',
        fontSize: 14,
        fontWeight: 100,
    },

};


class FormAnnotation extends React.Component {

    handleSave = () => {
        const {onEditAnnotation, handleSubmit, saveAnnotation, idAnnotation, onCreateAnnotation, reset} = this.props;
        const save = (idAnnotation) ? onEditAnnotation : onCreateAnnotation;
        const submitter = handleSubmit(save);

        submitter().then(() => {
            saveAnnotation();
            reset();
        });

    }

    closeForm = () => {
        const { handleCloseDialog, reset} = this.props;
        reset();
        handleCloseDialog();
    }

    render() {
        const {classes, error, showD, titleForm} = this.props;
        return (showD &&
            <div className={classes.modalBack}>

                    <div className={classes.topBar}>
                        <Button  variant="fab" className={classes.iconButton} onClick={this.closeForm}>
                            <div className={classes.close}/>
                        </Button>
                    </div>
                <form>
                        <div className={classes.contentCover}>
                            <h3 className={classes.title}>{trans(titleForm)}</h3>
                                    <FullColumn>
                                        <TextField name="tag" type="text" label={trans('admin.panel.annotations.tag')} fullWidth/>
                                        <TextField name="annotation" type="text" label={trans('admin.panel.annotations.annotation')} fullWidth/>
                                    </FullColumn>
                                    {error && (
                                        <ErrorText>{error}</ErrorText>
                                    )}
                            <Button onClick={this.handleSave} className={classes.button} autoFocus color="primary"  variant="contained" >
                            {trans('admin.panel.btn.save')}
                            </Button>
                        </div>
                </form>
                        <div className={classes.bottomBar}>
                            <Button onClick={this.closeForm} variant="contained" className={classes.linkButton}>
                            {trans('admin.panel.DICOMs.assign.dialog.cancel')}
                            </Button>
                        </div>

            </div>
        );
    }
}

FormAnnotation.propTypes = {
    classes: PropTypes.object.isRequired,
}

const withReducer = injectReducer({key: 'form', reducer: formReducer})

export default compose(
    reduxForm('HForm'),
    withReducer,
    withStyles(styles),
)(FormAnnotation)