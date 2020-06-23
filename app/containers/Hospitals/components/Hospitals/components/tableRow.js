import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import colors from '../../../../../style/colors';
import { withStyles } from '@material-ui/core/styles/index'
import TableCell from '@material-ui/core/TableCell/index'
import dateFormat from "dateformat"

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

class TableRowHospital extends React.Component {

    handleOpenDialogRow = () => {
        const { handleOpenDialog , hospital} = this.props;
        handleOpenDialog(hospital);
    }

    handleOpenFormRow = () => {
        const { handleOpenForm , hospital} = this.props;
        handleOpenForm(hospital);
    }

    render() {

        const { classes, hospital} = this.props;
        return (
            <TableRow className={classes.row} key={hospital._id}>
                <CustomTableCell component="th" scope="row" className={classes.rowPadding}>
                    {hospital.state}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row" className={classes.rowPadding}>
                    {hospital.city}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row" className={classes.rowPadding}>
                    {hospital.zip}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row"  className={classes.rowPadding}>
                    {hospital.name}
                </CustomTableCell>
                <CustomTableCell className={classes.rowPadding}>{hospital.address}</CustomTableCell>
                <CustomTableCell className={classes.rowPadding}>{hospital.phone}</CustomTableCell>
                <CustomTableCell className={classes.rowPadding}>
                    {(hospital.contactPerson && hospital.contactPerson.firstName) ? hospital.contactPerson.firstName: ''}
                    {(hospital.contactPerson && hospital.contactPerson.lastName) ? ' ' + hospital.contactPerson.lastName: ''}

                    <br />
                    {(hospital.contactPerson && hospital.contactPerson.email) ? hospital.contactPerson.email: ''}

                </CustomTableCell>
                <CustomTableCell className={classes.rowPadding} numeric>{hospital.transfersCount}</CustomTableCell>
                <CustomTableCell className={classes.rowPadding} numeric>{hospital.hospitalID && (hospital.hospitalID)}</CustomTableCell>
                <CustomTableCell className={classes.rowPadding} numeric>{dateFormat(new Date(hospital.createdAt), 'yyyy-mm-dd HH:MM')}</CustomTableCell>
                <CustomTableCell className={classes.rowPadding}>
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

export default TableRowHospital;