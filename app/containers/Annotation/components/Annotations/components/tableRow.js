import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import colors from '../../../../../style/colors';
import { withStyles } from '@material-ui/core/styles/index'
import TableCell from '@material-ui/core/TableCell/index'

const CustomTableCell = withStyles({
    head: {
        color: colors.fontDark,
        fontWeight: 'normal',
        borderRight: '1px solid',
        padding: '0 24px',
        height: '44px',
        textAlign: 'left',
        borderBottom: 'none',
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
        borderBottom: 'none',
        padding: '0 24px',
        borderRight: '1px solid',
        borderColor: colors.tableBorder,
        '&:nth-last-child': {
            borderRight: 'none',
        },
    },
})(TableCell);

class TableRowAnnotation extends React.Component {

    handleOpenDialogRow = () => {
        const { handleOpenDialog , annotation} = this.props;
        handleOpenDialog(annotation);
    }

    handleOpenFormRow = () => {
        const { handleOpenForm , annotation} = this.props;
        handleOpenForm(annotation);
    }

    render() {

        const { classes, annotation} = this.props;
        return (
            <TableRow className={classes.row} key={annotation._id}>
                <CustomTableCell component="th" scope="row" className={classes.nameRow}>
                    {annotation.tag}
                </CustomTableCell>
                <CustomTableCell>{annotation.annotation}</CustomTableCell>
                <CustomTableCell>
                    <div  className={classes.actionCover}>
                    <Button variant="fab" onClick={this.handleOpenFormRow} className={classes.editIcon} disableRipple>
                        <div className="icon-ico-Edit"/>
                    </Button>
                    <Button variant="fab" onClick={this.handleOpenDialogRow} className={classes.deleteIcon} disableRipple>
                        <div className="icon-ico-Remove"/>
                    </Button>
                </div>
                </CustomTableCell>
            </TableRow>
        );
    }
}

export default TableRowAnnotation;