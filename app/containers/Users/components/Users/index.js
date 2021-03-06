import React, { PureComponent } from 'react'
import trans from 'trans'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles/index'
import styled from 'styled-components'
import colors from '../../../../style/colors'
import UserItem from './components/UserItem'
import MaterialPagination from "../../../../components/MaterialPagination";
import Loading from 'components/Loading';

const FlexedContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-flow: row;
  // align-items: center;
`

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
        fontSize: '14',
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
        borderRight: '1px solid',
        padding: '0 24px',
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
        fontSize: 14,
        color: colors.fontTable,
    },
    container:{
        width:'100%',
        overflow: 'scroll',
        position: 'relative',
        height: '100%',
    },
    table: {
        minWidth: '100%',
    },
    row: {
        // color: colors.fontTable,
        textAlign: 'left',
        '&:nth-of-type(odd)': {
            backgroundColor: colors.tableGrey,
        },
    },
    nameRow:{
        width: '30%',
        fontWeight: '100',
    },
    flex:{
        flex: '1',
        textAlign: 'center',
        fontSize:18,
        fontWeight: 'normal',
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

class UsersStep extends PureComponent {
    
    constructor (props) {
        super(props);

        this.state = {
            currentPage: 1,
            countRows: 10,
        };
    }
    
    /**
     * Load list users
     */
    getListUsers = () => {
        const { onGetListUsers } = this.props;
        const { currentPage, countRows, } = this.state;
        onGetListUsers({
            page: currentPage,
            count: countRows,
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
                this.getListUsers();
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
                this.getListUsers();
            }
        );
    }
    
    componentWillMount() {
        this.getListUsers()
    }
    
    render () {
        const { classes, users, count} = this.props;
        const { countRows, currentPage } = this.state;
    
        const c = (count > 0) ? count : 0;
        
        if (!users) {
            return (<div className={ classes.container }><Loading/></div>)
        }
        return (
                <div className={ classes.container }>
                    <AppBar position="static" color="default" className={classes.bar}>
                        <Toolbar>
                            <Typography variant="title" className={classes.flex}>
                                {trans('admin.panel.users')}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell numeric>{trans('admin.panel.users.ID')}</CustomTableCell>
                                    <CustomTableCell>{trans('admin.panel.hospitals.name')}</CustomTableCell>
                                    <CustomTableCell numeric>{trans('admin.panel.users.registration.date')}</CustomTableCell>
                                    <CustomTableCell numeric>{trans('admin.panel.users.birth.date')}</CustomTableCell>
                                    <CustomTableCell>{trans('admin.panel.users.ddocument')}</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users && users.map(item => (
                                    <UserItem
                                        key={item._id}
                                        {...this.props}
                                        user={item}
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
        )
    }
}

UsersStep.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersStep)