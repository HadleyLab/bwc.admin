import React, { PureComponent } from 'react'
import trans from 'trans'
import PropTypes from 'prop-types';
import ContainedButtonSmall from '../../../../components/ContainedButtonSmall'
import ActionButtonCover from '../../../../components/ActionButtonCover'
import { withStyles } from '@material-ui/core/styles/index'
import colors from '../../../../style/colors'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import AlertDialog from './components/dialog';
import FormAnnotation from './components/form';
import TableRowAnnotation from './components/tableRow';
import Notification from "../../../../components/Notification";

import { Subject } from 'rxjs'
import 'rxjs/add/operator/debounceTime'

const CustomTableCell = withStyles({
    head: {
        color: colors.fontDark,
        fontWeight: 'normal',
        borderBottom: 'none',
        borderTop: '1px solid',
        borderRight: '1px solid',
        padding: '0 24px',
        fontSize: 14,
        height: '44px',
        textAlign: 'left',
        borderColor: colors.tableBorder,
        '&:nth-last-child': {
            borderRight: 'none',
        },
    },
    body: {
        color: colors.fontTable,
        fontWeight: '100',
        fontSize: 14,
        textAlign: 'left',
        padding: '0 24px',
        borderBottom: 'none',
        borderRight: '1px solid',
        borderColor: colors.tableBorder,
        '&:nth-last-child': {
            borderRight: 'none',
        },
    },
})(TableCell);

const styles = {
    root: {
        width: '100%',
        marginTop: 0,
        overflowX: 'auto',
        boxShadow: 'none',
    },
    container:{
        width:'100%',
        overflow: 'scroll',
        position: 'relative',
        height: '100%',
    },
    openPopup:{
        width:'100%',
        position: 'relative',
        height: '100%',
    },
    table: {
        minWidth: '100%',

    },
    row: {
        color: colors.fontTable,
        textAlign: 'left',
        '&:nth-of-type(odd)': {
            backgroundColor: colors.tableGrey,
        },
    },
    nameRow:{
        width: '30%',
    },
    flex:{
        flex: '0 0.85 85%',
        textAlign: 'center',
        fontSize:18,
        fontWeight: 'normal',
    },
    bar:{
        boxShadow: 'none',
        backgroundColor: colors.white,
    },
    barSearch:{
        boxShadow: 'none',
        backgroundColor: colors.white,
        marginBottom: 16,
    },
    button: {
        fontSize: 18,
        color: '#73738b',
        margin: '0 .5em',
        background: 'transparent',
        boxShadow: 'none',
        height: '20px',
        width: '20px',
        '&:hover':{
            background: 'transparent',
        },
        '&:active': {
            boxShadow: 'none',
            background: 'transparent',
        },
    },
    editIcon:{
        fontSize: 18,
        color: '#73738b',
        margin: '0 .5em',
        background: 'transparent',
        boxShadow: 'none',
        '&:hover':{
            color: '#3750ff',
            boxShadow: 'none',
            background: 'transparent',
        },
        '&:active': {
            color: '#3750ff',
            boxShadow: 'none',
            background: 'transparent',
        },
    },
    deleteIcon:{
        fontSize: 18,
        color: '#73738b',
        margin: '0 .5em',
        background: 'transparent',
        boxShadow: 'none',
        '&:hover':{
            color: '#e5082c',
            boxShadow: 'none',
            background: 'transparent',
        },
        '&:active': {
            color: '#e5082c',
            boxShadow: 'none',
            background: 'transparent',
        },
    },
    actionCover:{
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionCell:{
      textAlign: 'center',
    },
    form: {
        position: 'relative',
        flex: '0 0.20 20%',
    },
    formRow:{
        position: 'relative',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainer:{
        width: 'auto',
        position: 'absolute',
        right: 0,
    },
    clearButton:{
        width:  30,
        height: 30,
        minWidth: 30,
        fontSize: 10,
    },
};

const SHOW_NOTIFICATION_DELAY_TIME = 1500;

class AnnotationsStep extends PureComponent {

    constructor (props) {
        super(props);
        this.state = {
            ShowDialog: false,
            ShowForm: false,
            idAnnotation: 0,
            nameActiveAnnotation: null,
            showSuccessfulNotification: false,
        };

        this.getListAnnotations();
    }

    componentWillMount () {
        this.delayCloseNotification = new Subject()
        this.delayCloseNotification.debounceTime(SHOW_NOTIFICATION_DELAY_TIME).subscribe(this.closeNotification)
    }
    /**
     * Opens the dialog box when you delete an item
     *
     * @param {object} annotation
     */
    handleOpenDialog = (annotation) => {
        this.setState(
            {
                ShowDialog: true,
                idAnnotation: annotation._id,
                nameActiveAnnotation: annotation.tag
            }
        );
    };

    /**
     * Opens the form for editing or creating items
     *
     * @param {object} annotation
     */
    handleOpenForm = (annotation) => {
        const { onGetAnnotation } = this.props;

        const id = (annotation && annotation.hasOwnProperty('_id')) ?  annotation._id : null;
        const tag = (annotation && annotation.hasOwnProperty('tag')) ?  annotation.tag : null;

        const titleForm = (id)
            ? 'admin.panel.annotation.action.form.title.edit'
            : 'admin.panel.annotation.action.form.title.create'
        ;

        this.setState(
            {
                ShowForm: true,
                idAnnotation: id,
                titleForm: titleForm,
                nameActiveAnnotation: tag,
            }
        );
        if (id) {
            onGetAnnotation({id});
        }
    };

    /**
     * Close dialog window
     */
    handleCloseDialog = () => {
        this.setState(
            {
                ShowDialog: false,
                ShowForm: false,
                idAnnotation: 0
            }
        );
    };

    /**
     * Close dialog window
     */
    handleCloseDialog = () => {
        this.setState(
            {
                ShowDialog: false,
                ShowForm: false,
                idAnnotation: 0
            }
        );
    };

    /**
     * Confirms and deletes the element from the database
     *
     * @param {string} id
     */
    confirmDeleteAnnotation = (id) => {
        const {onDelAnnotation } = this.props;
        onDelAnnotation({id});
        this.getListAnnotations();
        this.handleCloseDialog();
    }

    /**
     * Save annotation
     */
    saveAnnotation = () => {
        this.getListAnnotations();
        this.handleCloseDialog();
        this.showNotification();
    }

    showNotification = () => {
        this.setState(
            {
                showSuccessfulNotification: true
            }
        );

        this.delayCloseNotification.next();
    }

    closeNotification = () => {
        this.setState({showSuccessfulNotification: false});
    }

    /**
     * Load list annotation
     */
    getListAnnotations = () => {
        const { onGetListAnnotations } = this.props;
        onGetListAnnotations();
    }

    render () {
        const { classes, annotations, onCreateAnnotation, onEditAnnotation} = this.props;
        const { showSuccessfulNotification, nameActiveAnnotation, idAnnotation, ShowDialog, ShowForm} = this.state;

        return (
              <div className={ShowDialog || ShowForm ? classes.openPopup : classes.container}>
                  <AppBar position="static" color="default" className={classes.bar}>
                      <Toolbar>
                          <Typography variant="title" className={classes.flex}>
                              {trans('admin.panel.annotation')}
                          </Typography>
                          <ActionButtonCover>
                            <ContainedButtonSmall onClick={() => this.handleOpenForm()}>{trans('admin.panel.annotations.add.button')}</ContainedButtonSmall>
                          </ActionButtonCover>
                      </Toolbar>
                  </AppBar>

                  <AlertDialog
                      showD={ShowDialog}
                      handleCloseDialog={this.handleCloseDialog}
                      confirmDeleteAnnotation={this.confirmDeleteAnnotation}
                      idAnnotation={idAnnotation}
                      nameActiveAnnotation={nameActiveAnnotation}
                  />

                  <FormAnnotation
                      showD={ShowForm}
                      handleCloseDialog={this.handleCloseDialog}
                      idAnnotation={idAnnotation}
                      saveAnnotation={this.saveAnnotation}
                      titleForm={this.state.titleForm}
                      onCreateAnnotation={onCreateAnnotation}
                      onEditAnnotation={onEditAnnotation}
                  />

                  <Notification show={showSuccessfulNotification} onClose={this.closeNotification}>
                    {trans('admin.panel.annotation.notification.successful.save.part1')}
                    {nameActiveAnnotation}
                    {trans('admin.panel.annotation.notification.successful.save.part2')}
                  </Notification>

                  <Paper className={classes.root}>
                      <Table className={classes.table}>
                          <TableHead>
                              <TableRow>
                                  <CustomTableCell>{trans('admin.panel.annotations.tag')}</CustomTableCell>
                                  <CustomTableCell>{trans('admin.panel.annotations.annotation')}</CustomTableCell>
                                  <CustomTableCell numeric className={classes.actionCell}>{trans('admin.panel.annotations.actions')}</CustomTableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {annotations && annotations.map(n =>
                                   (
                                    <TableRowAnnotation
                                        key={n._id}
                                        {...this.props}
                                        annotation={n}
                                        handleOpenDialog={this.handleOpenDialog}
                                        handleOpenForm={this.handleOpenForm}
                                    />
                                  )
                              )}
                          </TableBody>
                      </Table>
                  </Paper>
              </div>
        )
    }
}

AnnotationsStep.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnnotationsStep)