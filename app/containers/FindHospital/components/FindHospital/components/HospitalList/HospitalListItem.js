import React, { PureComponent } from 'react'
import FlexBetween from '../../../../../../components/FlexBetween'
import colors from 'style/colors'
import { withStyles } from '@material-ui/core/styles/index'
import { Subject } from 'rxjs'
import 'rxjs/add/operator/debounceTime'
import Item from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';


const styles = ({
    cssRoot:{
        padding:0,
    },
    cssAddress:{
        textAlign: 'right',
        fontSize: 14,
        paddingRight: 0,
        fontWeight: 300,
        color: '#9497A2',
    },
    cssName:{
        fontSize: 14,
        fontWeight: 300,
        color: '#626285',
        '&+.cssListItem:hover':{
            color: '#000',
        }
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
    cssListItem:{
        padding: '22px',
        '&:hover':{
            backgroundColor: '#F4F5FA',
        },
    },
    cssFocus:{
        padding: '22px',
        backgroundColor: '#F4F5FA',
        fontWeight: 'bolds'
    },
    cssDivider:{
        borderBottomColor: '#EBEBF7',
    },
    divider:{
        backgroundColor: '#EBEBF7',
    },
    icon:{
        display: 'none',
        color: "#fff",
        marginRight:16,
    }
});

class HospitalListItem extends React.Component {

    selectHoshital = () => {
        const {handleSelectHospital, hospital} = this.props;
        handleSelectHospital(hospital);
    };

    render() {
        const {classes, hospital, activeHospital} = this.props;

        const rootClass = (activeHospital && hospital._id === activeHospital._id) ? classes.cssFocus : classes.cssListItem;
        return (
            <Item button
                      divider={true}
                      classes={{root: rootClass,
                          focusVisible: classes.cssFocus,
                          divider: classes.cssDivider,}}
                        onClick={this.selectHoshital}
            >
                <FlexBetween>
                    <DoneIcon className={classes.icon}/>
                    <ListItemText
                        primary={hospital.name}
                        classes={{ root: classes.cssRoot,
                            primary: classes.cssName}}/>
                    <ListItemText primary={hospital.address}
                                  secondary={hospital.phone}
                                  classes={{ root: classes.cssRoot,
                                      primary: classes.cssAddress,
                                      secondary: classes.cssAddress,}}/>

                </FlexBetween>
            </Item>
                    )
                }
}
export default withStyles(styles)(HospitalListItem)