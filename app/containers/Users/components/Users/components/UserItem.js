import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import colors from '../../../../../style/colors'
import { withStyles } from '@material-ui/core/styles/index'
import TableCell from '@material-ui/core/TableCell/index'
import dateFormat from "dateformat"

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
    render() {
        const { classes, user} = this.props;

        return (
            <TableRow className={classes.row} key={user._id}>
                <CustomTableCell numeric className={classes.nameRow}>{user._id}</CustomTableCell>
                <CustomTableCell component="th" scope="row" className={classes.nameRow}>
                    {user.firstName} {user.lastName}
                </CustomTableCell>
                <CustomTableCell numeric>{dateFormat(new Date(user.createdAt), 'yyyy-mm-dd HH:MM')}</CustomTableCell>
                <CustomTableCell numeric>{user.dob}</CustomTableCell>
                <CustomTableCell numeric>
                    {
                        (user.sign)
                        ? (
                                <a target="_blank" href={user.envelopeId}>Download</a>
                            )
                        : 'Not signed'
                    }
                </CustomTableCell>
            </TableRow>
        );
    }
}

export default UserItem;