import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { EmailedIcon,
    ReceivedIcon,
    AvailableIcon,
    InitIcon,
} from "../../../../../components/StatusIcons";
import trans from '../../../../../trans'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import colors from '../../../../../style/colors'
import { withStyles } from '@material-ui/core/styles/index'
import TableCell from '@material-ui/core/TableCell/index'
import dateFormat from "dateformat"
import styled from 'styled-components'

import {
    ADMIN_STATUS_FROM_TRANSFER_INIT,
    ADMIN_STATUS_FROM_TRANSFER_PROCESSED,
    ADMIN_STATUS_FROM_TRANSFER_RECEIVED
} from '../../../constants';

const CustomTableCell = withStyles(theme => ({
    head: {
        color: colors.fontDark,
        fontWeight: 'normal',
        borderBottom: 'none',
        borderTop: '1px solid',
        borderRight: '1px solid',
        padding: '0 24px',
        height: '44px',
        textAlign: 'left',
        fontSize: '1em',
        borderColor: colors.tableBorder,
        '&:nth-last-child': {
            borderRight: 'none',
        },
    },
    body: {
        color: colors.fontTable,
        fontWeight: '100',
        fontSize: '1em',
        textAlign: 'left',
        padding: '0 24px',
        borderBottom: 'none',
        borderRight: '1px solid',
        borderColor: colors.tableBorder,
        '&:nth-last-child': {
            borderRight: 'none',
        },
    },
}))(TableCell);

const DocumentLink = styled.a`
    align-items: center;
`
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: 0,
        overflowX: 'auto',
        boxShadow: 'none',
        borderBottom: 'none',
        borderTop: '1px solid',
        borderColor: colors.tableBorder,
        fontSize: '1em',
        color: colors.fontTable,
    },
    container:{
        width:'100%',
    },
    table: {
        minWidth: '100%',
    },
    row: {
        textAlign: 'left',
        '&:nth-of-type(odd)': {
            backgroundColor: colors.tableGrey,
        },
    },
    nameRow:{
        border: 'none',
        borderRight: '1px solid',
        borderColor: colors.tableBorder,
        width: '30%',
        fontWeight: '100',
    },
    flex:{
        flex: '0 0.85 85%',
        textAlign: 'center',
    },
    bar:{
        backgroundColor: colors.white,
    },
    button: {
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
        document:{
            boxShadow: 'none',
            borderRadius: '4px',
        },
    },
    actionCell:{
        width: '15%',
        textAlign: 'center',
    },
    formControl:{
        width: '100%',
        borderRadius: '4px',

    },
    icon:{
        display: 'none',
    },
    rootAction:{
        width: '100%',
        marginTop: 0,
        overflowX: 'auto',
        boxShadow: 'none',
        borderRadius: '4px',
    },
    selectMenu:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 0,
    },
});

class UserItem extends React.Component {

     changeStatus = (event) => {
        const {transfer, onUpdateTransfersStatus} = this.props;
        const status = event.target.value;
        const data = {
            transferId: transfer._id,
            status: status,
        };
         onUpdateTransfersStatus(data);
     }

    render() {
        const { classes, transfer} = this.props;
        if (!transfer.user || !transfer.hospital) {
            return null
        }
        const children = (
            <div className={classes.actionCover}>
                <form className={classes.rootAction} autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <Select
                            value={transfer.adminStatus}
                            onChange={this.changeStatus}
                            classes={{icon: classes.icon,
                                selectMenu: classes.selectMenu}}
                            disableUnderline
                        >
                            <MenuItem value={ADMIN_STATUS_FROM_TRANSFER_INIT}><InitIcon/>{trans('admin.panel.users.status.init')}</MenuItem>
                            <MenuItem value={ADMIN_STATUS_FROM_TRANSFER_RECEIVED}><ReceivedIcon/>{trans('admin.panel.users.status.received')}</MenuItem>
                            <MenuItem value={ADMIN_STATUS_FROM_TRANSFER_PROCESSED}><AvailableIcon/>{trans('admin.panel.users.status.processed')}</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </div>
        )

        return (
            <TableRow className={classes.row} key={transfer._id}>
                <CustomTableCell >{transfer._id}</CustomTableCell>
                <CustomTableCell >
                    {transfer.user.firstName} {transfer.user.lastName}
                </CustomTableCell>
                <CustomTableCell >
                    {transfer.user.dob}
                </CustomTableCell>
                <CustomTableCell>
                    {transfer.hospital.name}
                </CustomTableCell>
                <CustomTableCell>
                    {dateFormat(new Date(transfer.createdAt), 'yyyy-mm-dd HH:MM')}
                </CustomTableCell>
                <CustomTableCell>
                    {transfer.MRN}
                </CustomTableCell>
                <CustomTableCell>
                    { (transfer.hospital && transfer.sign && transfer.envelopeId)
                        ? (
                            <DocumentLink target="_blank" href={transfer.envelopeId}>
                                {trans('dashboard.view.agreement.btn')}
                            </DocumentLink>
                        )
                        : (
                            "not signed"
                        )
                    }
                </CustomTableCell>
                <CustomTableCell>{children}</CustomTableCell>
            </TableRow>
        );
    }
}

export default UserItem;