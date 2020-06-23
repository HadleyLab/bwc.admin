import React, { PureComponent } from 'react'
import trans from 'trans'
import FlexBetween from '../../../../../../components/FlexBetween'
import colors from 'style/colors'
import { withStyles } from '@material-ui/core/styles/index'
import { Subject } from 'rxjs'
import 'rxjs/add/operator/debounceTime'
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import HospitalListItem from './HospitalListItem';


const Container = styled.div`
    position:relative;
    width:100%;
    height: 100vh;
    padding: 3em;
    display:flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h2`
    color:#000;
    font-size:22px;
    font-weight:300;
    margin:2em 0 0;
    text-align: center;
`

const styles = theme => ({
    btnDone: {
        alignItems: 'center',
    },
    cover:{
        width: "100%",
        maxWidth: "100%"

    },
    hospitals:{
        width: '100%',
        boxShadow: 'none',
    },
    cssList:{
        paddingBottom:68,
    },
    typography:{
        margin: '1.5em 0',
        fontSize: 15,
        fontWeight: 400,
    },
    moreBtn:{
        bottom:0,
        position: 'absolute',
        background: colors.white,
        borderTop: '1px solid #EBEBF7',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        '&:hover':{
            background: colors.white,
        }
    },
    cssButton:{
        padding: '.8em',
        textAlign: 'center',
    },
    cssMore:{
        fontSize: 14,
        fontWeight: 300,
        color: '#8998DF',
        textTransform: 'uppercase',
        '&:hover':{
            color: '#5366BD',
        }
    },
    cssSticky:{
        backgroundColor: "#fff",
        borderBottom: '1px solid',
        borderBottomColor: '#EBEBF7',
    },
    overflow:{
        maxHeight:320,
        overflow: 'scroll',
    }
});

class HospitalList extends React.Component {

    render() {
        const {classes, hospitals, handleMore, count, handleSelectHospital, activeHospital, done} = this.props;
        if(!hospitals){
            return null;
        }
        const countLabel = ' ('+(count - hospitals.length)+')';
        return (
            <Paper className={classes.hospitals}>
                <List
                    classes={{root: classes.cssList}}
                    subheader={<ListSubheader component="div" classes={{root: classes.cssSticky}}>
                        <FlexBetween>
                            <Typography className={classes.typography}>{trans('dialog.add.hospital.name')}</Typography>
                            <Typography className={classes.typography}>{trans('dialog.add.hospital.contacts')}</Typography>
                        </FlexBetween>
                    </ListSubheader>}>
                    <div className={classes.overflow}>
                    {hospitals && hospitals.map(hospital =>
                        (
                            <HospitalListItem
                                key={hospital._id}
                                hospital={hospital}
                                handleSelectHospital={handleSelectHospital}
                                activeHospital={activeHospital}
                            />

                        )
                    )}
                    </div>
                    {(count > hospitals.length) ? (
                        <ListItem button
                                  className={classes.moreBtn}
                                  onClick={handleMore}
                        >
                            <ListItemText
                                primary={trans('dialog.add.hospital.more.btn') + countLabel}
                                classes={{ root: classes.cssButton,
                                    primary: classes.cssMore}}/>
                        </ListItem>
                    ): null}


                </List>
            </Paper>
        )
    }
}
export default withStyles(styles)(HospitalList)