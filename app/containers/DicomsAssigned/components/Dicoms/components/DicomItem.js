import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import trans from '../../../../../trans'
import { withStyles } from '@material-ui/core/styles/index'
import TableCell from '@material-ui/core/TableCell/index'
import colors from '../../../../../style/colors'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const CustomTableCell = withStyles(theme => ({
    head: {
        color: colors.fontDark,
        fontWeight: 'normal',
        borderBottom: 'none',
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
        padding: '0 24px',
        fontSize: 14,
        textAlign: 'left',
        borderBottom: 'none',
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
        // overflow: 'scroll',
        position: 'relative',
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
    nameDicom:{
        fontSize:14,
        fontWeight: '100',
        textAlign: 'left',
        color: colors.fontTable,
        lineHeight: '54px',
    },
});

class DicomItem extends React.Component {

    render() {
        const { classes, dicom, onOpenWindowsAssigned, onOpenWindowsMoreInfo} = this.props;

        if (!dicom || !dicom.transfer) {
            return null;
        }
        const userName = (dicom.transfer.user) ? dicom.transfer.user.firstName + ' ' + dicom.transfer.user.lastName : '';

        const btnReassign = (
            <div className={classes.actionCover}>
                <Button className={classes.button} onClick={() => onOpenWindowsAssigned(dicom._id)}>
                    {trans('admin.panel.DICOMs.btn.reassign')}
                </Button>
                <Button className={classes.button} onClick={() => onOpenWindowsMoreInfo(dicom)}>
                    {trans('admin.panel.DICOMs.btn.more')}
                </Button>
            </div>
        )
        return (
            <TableRow className={classes.row} key={dicom._id}>
              <CustomTableCell component="th" scope="row" >{dicom.patient.first_name} {dicom.patient.last_name}</CustomTableCell>
              <CustomTableCell component="th" scope="row" >{dicom.patient.dob}</CustomTableCell>
              <CustomTableCell component="th" scope="row" ></CustomTableCell>
              <CustomTableCell component="th" scope="row" >{dicom.hospitalId}</CustomTableCell>
                <CustomTableCell>
                    {userName}
                </CustomTableCell>
                <CustomTableCell>{btnReassign}</CustomTableCell>
            </TableRow>
        );
    }
}

export default withStyles(styles)(DicomItem)
