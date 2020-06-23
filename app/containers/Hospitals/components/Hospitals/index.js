import React, { PureComponent } from 'react'
import trans from 'trans'
import queryString from "query-string"
import PropTypes from 'prop-types';
import ContainedButtonSmall from '../../../../components/ContainedButtonSmall'
import ActionButtonCover from '../../../../components/ActionButtonCover'
import FlexCover from 'components/FlexCover'
import { withStyles } from '@material-ui/core/styles/index'
import styled from 'styled-components'
import colors from '../../../../style/colors'
import SideBar from "../../../../components/SideBar";
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
import FormHospital from './components/form';
import TableRowHospital from './components/tableRow';
import FormSearch from './components/formSearch';
import FlexedContainer from 'components/FlexedContainer'
import MaterialPagination from "../../../../components/MaterialPagination";
import Notification from "../../../../components/Notification";
import Close from '../../../../components/Img/ico-Close.svg'
import SearchIcon from '../../../../components/Img/ico-Search.svg'
import { Subject } from 'rxjs'
import 'rxjs/add/operator/debounceTime'
import {
    URL_FROM_PAGE_ANNOTATION,
    URL_FROM_PAGE_NOT_ACTIVE_HOSPITALS
} from '../../../../constants'


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
    rowPadding:{
        padding: '0 7px',
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

class HospitalsStep extends PureComponent {

    constructor (props) {
        super(props);
        const queryParams = queryString.parse(props.location.search);

        this.state = {
            ShowDialog: false,
            ShowForm: false,
            idHospital: 0,
            hospital: null,
            nameActiveHospital: null,
            currentPage: 1,
            countRows: 10,
            showSuccessfulNotification: false,
            searchText: (queryParams.hospital) ? queryParams.hospital : ''
        };
    }

    componentWillMount () {
        this.delayCloseNotification = new Subject()
        this.delayCloseNotification.debounceTime(SHOW_NOTIFICATION_DELAY_TIME).subscribe(this.closeNotification)
    }

    /**
     * Opens the dialog box when you delete an item
     *
     * @param {object} hospital
     */
    handleOpenDialog = (hospital) => {
        this.setState(
            {
                ShowDialog: true,
                idHospital: hospital._id,
                nameActiveHospital: hospital.name,
                redefinition: (hospital.transfersCount > 0) ? true : false
            }
        );
    };

    /**
     * Opens the form for editing or creating items
     *
     * @param {object} hospital
     */
    handleOpenForm = (hospital) => {
        const { onGetHospital } = this.props;

        const id = (hospital && hospital.hasOwnProperty('_id')) ?  hospital._id : null;
        const name = (hospital && hospital.hasOwnProperty('name')) ?  hospital.name : null;

        const titleForm = (id)
            ? 'admin.panel.hospitals.action.form.title.edit'
            : 'admin.panel.hospitals.action.form.title.create'
        ;

        this.setState(
            {
                ShowForm: true,
                hospital: hospital,
                idHospital: id,
                titleForm: titleForm,
                nameActiveHospital: name,
            }
        );
        if (id) {
            onGetHospital({id});
        }
    };

    /**
     * Close dialog window
     */
    handleCloseDialog = () => {
        this.setState(
            {
                ShowDialog: false,
                hospital: null,
                ShowForm: false,
                idHospital: 0
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
                idHospital: 0
            }
        );
    };

    /**
     * Confirms and deletes the element from the database
     *
     * @param {string} id
     */
    confirmDeleteHospital = (id) => {
        const {onDelHospital } = this.props;
        const { currentPage, countRows, searchText } = this.state;
        onDelHospital({
            id: id,
            page: currentPage,
            count: countRows,
            q: searchText
        });
        this.handleCloseDialog();
        this.getListHospitals();
        
    }

    /**
     * Save hospital
     */
    saveHospital = () => {
        this.getListHospitals();
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
     * Load list hospital
     */
    getListHospitals = (type) => {
        const { onGetListHospitals } = this.props;
        const { currentPage, countRows, searchText, typeHospitalList } = this.state;
        onGetListHospitals({
            page: currentPage,
            count: countRows,
            q: searchText,
            type: (type) ? type : typeHospitalList
        });
    }

    /**
     * Pefanation change page
     *
     * @param {integer} page
     */
    onChangePage = (page) => {
        this.setState(
            {
                currentPage: page,
            }, (page) => {
                this.getListHospitals();
            }
        );
    }

    /**
     * Change count rows for table hospitals
     *
     * @param countRows
     */
    onChangeCountRows = (countRows) => {
        this.setState(
            {
                countRows: countRows,
            }, (page) => {
                this.getListHospitals();
            }
        );
    }

    /**
     * Search text
     *
     * @param text
     */
    onSearchHospital = (text) => {
        this.setState(
            {
                searchText: text,
            }, (page) => {
                this.getListHospitals();
            }
        );
    }

    render () {
        const { classes, hospitals, count, onCreateHospital, onEditHospital, typeList, history, ...others} = this.props;
        const {
            showSuccessfulNotification,
            nameActiveHospital,
            hospital,
            typeHospitalList,
            ShowDialog,
            idHospital,
            titleForm,
            ShowForm,
            redefinition
        } = this.state;

        const c = (count > 0) ? count : 0;

        if (typeHospitalList !== typeList) {
            this.setState({typeHospitalList: typeList})
            this.getListHospitals(typeList)
            this.setState({ShowForm: false});
            
        }

        return (
              <div
                   className={ShowDialog || ShowForm ? classes.openPopup : classes.container}
              >
                  <AppBar position="static" color="default" className={classes.bar}>
                      <Toolbar>
                          <FormSearch onSearch={this.onSearchHospital} {...others} />
                          <Typography variant="title" className={classes.flex}>
                              {trans('admin.panel.hospitals')}
                          </Typography>
                          <ActionButtonCover>
                            <ContainedButtonSmall onClick={() => this.handleOpenForm()}>{trans('admin.panel.hospitals.add.button')}</ContainedButtonSmall>
                          </ActionButtonCover>
                      </Toolbar>
                  </AppBar>

                  <AlertDialog
                      showD={ShowDialog}
                      handleCloseDialog={this.handleCloseDialog}
                      confirmDeleteHospital={this.confirmDeleteHospital}
                      idHospital={idHospital}
                      redefinition={redefinition}
                      nameActiveHospital={nameActiveHospital}
                      history={history}
                  />

                  {(ShowForm)
                      ? (
                      <FormHospital
                          showD={ShowForm}
                          handleCloseDialog={this.handleCloseDialog}
                          idHospital={idHospital}
                          saveHospital={this.saveHospital}
                          titleForm={titleForm}
                          onCreateHospital={onCreateHospital}
                          onEditHospital={onEditHospital}
                          hospital={hospital}
                          typeList={typeList}
                      />)
                      :  null
                  }
                  

                  <Notification show={showSuccessfulNotification} onClose={this.closeNotification}>
                    {trans('admin.panel.hospitals.notification.successful.save.part1')}
                    {nameActiveHospital}
                    {trans('admin.panel.hospitals.notification.successful.save.part2')}
                  </Notification>

                  <Paper className={classes.root}>
                      <Table className={classes.table}>
                          <TableHead>
                              <TableRow>
                                  <CustomTableCell>{trans('admin.panel.hospitals.state')}</CustomTableCell>
                                  <CustomTableCell>{trans('admin.panel.hospitals.city')}</CustomTableCell>
                                  <CustomTableCell>{trans('admin.panel.hospitals.zip')}</CustomTableCell>
                                  <CustomTableCell>{trans('admin.panel.hospitals.name')}</CustomTableCell>
                                  <CustomTableCell>{trans('admin.panel.hospitals.address')}</CustomTableCell>
                                  <CustomTableCell>{trans('admin.panel.hospitals.phone')}</CustomTableCell>
                                  <CustomTableCell>{trans('admin.panel.hospitals.contact.person')}</CustomTableCell>
                                  <CustomTableCell numeric>{trans('admin.panel.hospitals.users.assign')}</CustomTableCell>
                                  <CustomTableCell numeric>{trans('admin.panel.hospitals.users.hospitalID')}</CustomTableCell>
                                  <CustomTableCell numeric>{trans('admin.panel.hospitals.created')}</CustomTableCell>
                                  <CustomTableCell numeric className={classes.actionCell}>{trans('admin.panel.hospitals.actions')}</CustomTableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {hospitals && hospitals.map(n =>
                                   (
                                    <TableRowHospital
                                        key={n._id}
                                        {...this.props}
                                        hospital={n}
                                        handleOpenDialog={this.handleOpenDialog}
                                        handleOpenForm={this.handleOpenForm}
                                    />
                                  )
                              )}
                              <TableRow className={classes.row}>
                                  <MaterialPagination
                                      onChangePage={this.onChangePage}
                                      onChangeCountRows={this.onChangeCountRows}
                                      colSpan={11}
                                      count={c}
                                      rowsPerPage={this.state.countRows}
                                      page={this.state.currentPage}
                                  />
                              </TableRow>
                          </TableBody>
                      </Table>
                  </Paper>
              </div>
        )
    }
}

HospitalsStep.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HospitalsStep)