import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import trans from 'trans'

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
import AssignDialog from "../../../../components/AssignDialog"
import DicomItem from './components/DicomItem'
import Autocomplete from './components/Autocomplete'
import Notification from "../../../../components/Notification";
import { Subject } from 'rxjs'
import 'rxjs/add/operator/debounceTime'
import MaterialPagination from "../../../../components/MaterialPagination";
import Loading from 'components/Loading';
const SHOW_NOTIFICATION_DELAY_TIME = 1500;
import { DICOM_FILTER_PENDING } from '../../constants';
import MoreInfo from './components/MoreInfo'

const CustomTableCell = withStyles(theme => ({
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
        borderBottom: 'none',
        color: colors.fontTable,
        fontWeight: '100',
        padding: '0 24px',
        fontSize: 14,
        textAlign: 'left',
        borderRight: '1px solid',
        borderColor: colors.tableBorder,
        '&:nth-last-child': {
            borderRight: 'none',
        },
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: 0,
        overflowX: 'auto',
        boxShadow: 'none',
    },
    container:{
        width:'100%',
        height:'100%',
        position: 'relative',
    },
    containerNotScroll:{
        width:'100%',
        height:'100%',
        minWidth: '100%',
        position: 'relative',
        overflow: 'hidden',
    },
    tableContainer:{
        width:'100%',
        overflow: 'scroll',
    },
    table: {
        minWidth: '100%',
        borderCollapse: 'none',
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
        fontSize:18,
        fontWeight: 'normal',
        textAlign: 'center',
        width: '100%',
    },
    bar:{
        backgroundColor: colors.white,
    },
    button: {
        margin: '0 auto',
        background: 'transparent',
        textTransform: 'none',
        color: '#3750ff',
        boxShadow: 'none',
        '&:hover':{
            boxShadow:'none',
            color: colors.activeMenu,
            background: 'transparent',
        },
        '&:active': {
            boxShadow: 'none',
            background: 'transparent',
        },
        '&:focus': {
            boxShadow: 'none',
            background: 'transparent',
        },
    },
    actionCover:{
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionCell:{
        textAlign: 'center',
    },
    previewRoot:{
        display: 'flex',
        flexFlow: 'row',
    },
    avatar: {
        cursor: 'pointer',
        margin: '5px 10px 5px 0',
        width: 40,
        height: 40,
    },
});



class DicomsStep extends PureComponent {

    constructor (props) {
        super(props);
        this.state = {
            isShowWindowAssigned: false,
            isShowWindowMore: false,
            activDicomID: null,
            transferIDByDicom: null,
            activDicomInfo: null,
            userNameByDicom: null,
            showSuccessfulNotification: false,
            currentPage: 1,
            countRows: 10,
        };
    }
    
    
    /**
     * Load list users
     */
    getListDicoms = () => {
        const { onGetListDicom } = this.props;
        const { currentPage, countRows, } = this.state;
        onGetListDicom({
            page: currentPage,
            count: countRows,
            filter:DICOM_FILTER_PENDING
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
                this.getListDicoms();
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
                this.getListDicoms();
            }
        );
    }
    
    
    componentWillMount () {
        this.getListDicoms()
        this.delayCloseNotification = new Subject()
        this.delayCloseNotification.debounceTime(SHOW_NOTIFICATION_DELAY_TIME).subscribe(this.closeNotification)
    }

    showNotification = () => {
        this.setState({showSuccessfulNotification: true});
        this.delayCloseNotification.next();
    }

    closeNotification = () => {
        this.setState(
            {
                showSuccessfulNotification: false,
                userNameByDicom: null
            }
        );
    }

    /**
     * Show window for assigned user
     *
     * @param {string} idDicom
     */
    showWindowAssigned = (idDicom) => {
        this.setState(
            {
                isShowWindowAssigned: true,
                activDicomID: idDicom
            }
        );
    }

    /**
     * Show window for more info
     *
     * @param {object} idDicom
     */
    showWindowMoreInfo = (Package) => {
        const {onGetListStudy} = this.props
        onGetListStudy({'package':Package._id})
        this.setState(
            {
                isShowWindowMore: true,
                activDicomInfo: Package
            }
        );
    }

    /**
     * Hide window for assigned user
     */
    hideWindowAssigned = () => {
        this.setState(
            {
                isShowWindowAssigned: false,
                isShowWindowMore: false,
                activDicomID: null,
                transferIDByDicom: null,
                activDicomInfo: null
            }
        );
    }

    /**
     * Select transfer when assigned
     *
     * @param {string} id
     */
    selectingTransfer = (id) => {
        this.setState(
            {
                transferIDByDicom: id,
            }
        );
    }

    /**
     * Assigned user, btn ASSIGN click
     */
    assignUserForDicomFiles = () => {
        const { onAssignUser, users, onAssignTransfer} = this.props;
        const { transferIDByDicom, activDicomID, userIDByDicom} = this.state;

        if (activDicomID && transferIDByDicom) {
            const data = {
                packagesID: activDicomID,
                transferId: transferIDByDicom,
            }
            onAssignTransfer(data)
        }

        for (let i in users) {
            if(users[i]._id == userIDByDicom) {
                const userName = users[i].firstName + '  ' + users[i].lastName;
                this.setState({userNameByDicom: userName});
            }
        }

        this.hideWindowAssigned();
        this.showNotification()
    }

    render () {
        const { classes, dicoms, transfers, study, count} = this.props;
        const {
            isShowWindowAssigned,
            showSuccessfulNotification,
            userNameByDicom,
            isShowWindowMore,
            countRows, currentPage
        } = this.state;
    
        const c = (count > 0) ? count : 0;
    
        if (!dicoms) {
            return (<div className={ classes.container }><Loading/></div>)
        }
        
        return (
                <div className={ (isShowWindowAssigned) ? classes.containerNotScroll : classes.container}>
                    <div className={ classes.tableContainer}>
                    <AppBar position="static" color="default" className={classes.bar}>
                        <Toolbar>
                            <Typography variant="title" className={classes.flex}>
                                {trans('admin.panel.DICOMs.title.pending')}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>{trans('admin.panel.DICOMs.patient')}</CustomTableCell>
                                    <CustomTableCell>{trans('admin.panel.DICOMs.dob')}</CustomTableCell>
                                    <CustomTableCell>{trans('admin.panel.DICOMs.sex')}</CustomTableCell>
                                    <CustomTableCell>{trans('admin.panel.DICOMs.hospital')}</CustomTableCell>
                                    <CustomTableCell className={classes.actionCell}>{trans('admin.panel.hospitals.actions')}</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dicoms && dicoms.map(dicom =>
                                    ( dicom &&
                                        <DicomItem
                                            key={dicom._id}
                                            {...this.props}
                                            dicom={dicom}
                                            onOpenWindowsAssigned={this.showWindowAssigned}
                                            onOpenWindowsMoreInfo={this.showWindowMoreInfo}
                                        />
                                    )
                                )}
                            </TableBody>
                            <TableRow className={classes.row}>
                                <MaterialPagination
                                    onChangePage={this.onChangePage}
                                    onChangeCountRows={this.onChangeCountRows}
                                    colSpan={5}
                                    count={c}
                                    rowsPerPage={countRows}
                                    page={currentPage}
                                />
                            </TableRow>
                        </Table>
                    </Paper>
                    </div>
                    {isShowWindowAssigned && (
                        <AssignDialog onClose={this.hideWindowAssigned} onAssign={this.assignUserForDicomFiles}>
                            <Autocomplete transfers={transfers} onSelectingTransfer={this.selectingTransfer}/>
                        </AssignDialog>
                    )}


                    <Notification show={showSuccessfulNotification} onClose={this.closeNotification}>
                        {trans('admin.panel.hospitals.notification.successful.assign')}
                        {userNameByDicom}
                    </Notification>

                    {isShowWindowMore && (
                        <MoreInfo onClose={this.hideWindowAssigned} study={study} {...this.props}/>
                    )}
                </div>
        )
    }
}

DicomsStep.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DicomsStep)