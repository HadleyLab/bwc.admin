import React, { PureComponent } from 'react'
import colors from 'style/colors'
import { withStyles } from '@material-ui/core/styles/index'
import trans from 'trans'
import FullColumn from 'components/FullColumn/index'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = ({
    hospitals:{
        width: '100%',
        boxShadow: 'none',
        padding: '4em 1em',
        textAlign: 'center',
    },
    title:{
        color: "#626285",
        fontSize: 22,
        marginBottom: 5,
    },
    subTitle:{
        fontSize: 15,
        fontWeight: 100,
        color: '#9497A2',
    },
    button:{
        textTransform: 'none',
        padding: '0 0 0 5px',
        marginTop: -4,
        fontSize: 15,
        fontWeight: 100,
        color: '#9497A2',
        textDecoration: 'underline',
        background: 'transparent',
        '&:hover':{
            background: 'transparent',
        },
        '&:active':{
            background: 'transparent',
        }
    }

})

class HospitalNotFound extends React.Component {

    render() {
        const {classes, handleOpenFormNewHospital} = this.props;

        return (
            <Paper className={classes.hospitals}>
                <FullColumn>
                    <Typography className={classes.title}>{trans('dialog.add.hospital.nothing.found')}</Typography>
                    <Typography className={classes.subTitle}>{trans('dialog.add.hospital.nothing.found.desc')}</Typography>
                </FullColumn>
            </Paper>
        )
    }
}
export default withStyles(styles)(HospitalNotFound)