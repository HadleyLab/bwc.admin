import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import trans from 'trans'
import Button from '@material-ui/core/Button';
import Close from '../../../../../components/Img/ico-Close.svg'
import colors from '../../../../../style/colors'
import Loading from '../../../../../components/Loading';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ListItem from '@material-ui/core/ListItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { media } from "../../../../../style/containers";
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import FullColumn from '../../../../../components/FullColumn'
import Icon from '@material-ui/core/Icon';
import Viewer from './dcmViewer';
import IconButton from '@material-ui/core/IconButton';
const styles = {
    iconRoot:{
        background: '#fff',
        fontSize: 12,
        borderRadius:5,
        zIndex:999,
        boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 10px 0px rgba(0, 0, 0, 0.04), 0px 0px 10px 0px rgba(0, 0, 0, 0.02)',
        '&:hover':{
            background: '#F8F8F8',
        }
    },
    modalBack: {
        backgroundColor: 'rgba(223, 223, 238, 0.9)',
        backdropFilter: 'blur(2.3px)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: '10',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ExpansionPanelDetails:{
        padding: 0,
        overflow: 'hidden',
    },
    title: {
        textAlign: 'center',
        fontWeight: '300',
        fontSize: '2em',
        marginTop: '0.5em',
    },
    contentCover: {
        maxWidth: '100%',
        height: 900,
        backgroundColor: '#fff',
        overflow: 'auto',
        width: 800,
    },
    button: {
        width: '118px',
        height: '54px',
        margin: '1em auto',
        textTransform: 'none',
        color: colors.white,
        fontSize: '1em',
        background: colors.buttonBlue,
        '&:hover':{
            background: colors.activeMenu,
        },
        '&:active':{
            background: colors.activeMenu,
        },
    },
    topBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '2em',
        width: '100%',
    },
    bottomBar: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '1em',
        width: '100%',
    },
    topCenter: {
        textAlign: 'center',
        flex: 1,
    },
    iconButton:{
        width: '40px',
        height: '40px',
        background: 'rgba(255, 255, 255, 0.7)',
        boxShadow: '0 0 10px 0 rgba(21, 21, 49, 0.16)',
        '&:hover':{
            background: 'rgba(255, 255, 255, 0.9)',
        },
        '&:active':{
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 0 10px 0 rgba(21, 21, 49, 0.25)',
        },
    },
    close: {
        width: '8px',
        height: '8px',
        backgroundImage: `url(${Close})`,
        backgroundPosition: 'center',
        
    },
    flexedRow: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        flex: 1,
    },
    flexedColumn: {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    flexedRowRight: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flex: 1,
    },
    avatar:{
        width: 65,
        height: 52,
        borderRadius: 0,
    },
    list:{
        width: '100%',
        padding: '0 30px',
    },
    dicomItem:{
        maxWidth: '100%',
        padding: '6px 0 16px',
    },
    listItem:{
        padding: '0 0 1em',
        maxWidth: '100%',
        display: 'flex',
        flexFlow: 'column',
    },
    panelDetails:{
        backgroundColor: '#dddddd'
    },
    paper:{
        width: '100%'
    },
    pDicoms:{
        color: 'rgba(35, 35, 77, 0.6)',
        fontSize: 14,
        textAlign: 'center',
    },
    
    linkButton: {
        background: 'transparent',
        textTransform: 'none',
        color: '#6d6d9b',
        fontSize: 14,
        boxShadow: 'none',
        '&:hover':{
            background: 'transparent',
            boxShadow: 'none',
            color: colors.activeMenu,
        },
        '&:active':{
            background: 'transparent',
            boxShadow: 'none',
            color: colors.activeMenu,
        },
        cover:{
            margin: '2em',
            padding: 15,
        },
    },
    dicomName:{
        color:'rgba(35, 35, 77, 0.6)',
        fontSize: 14,
        fontWeight: 100,
    },
    TableRow:{
        height: 10
    },
    dicomsRow:{
        overflow: 'hidden',
        flexFlow: 'row',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(235, 235, 247, 1)',
    },
    iconView:{
        width:'100%',
        height: '100%',
        padding: 17,
        fontSize: 18,
        position: 'absolute',
        color: 'rgba(255, 255, 255, 0)',
        transition: '200ms',
        '&:hover':{
            color: 'rgba(255, 255, 255, .8)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }
    },
    studyFiles:{
        fontWeight: 300,
        color: '#9497A2',
        marginLeft: 8,
    },
    buttonV: {
        fontSize: 12,
        color: '#fff',
        background: 'transparent',
        borderRadius:0,
        padding: 0,
        margin: '5px 11px 5px 0',
    },
    iconView:{
        width:'100%',
        height: '100%',
        padding: 17,
        fontSize: 18,
        position: 'absolute',
        color: 'rgba(255, 255, 255, 0)',
        transition: '200ms',
        '&:hover':{
            color: 'rgba(255, 255, 255, .8)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }
    },
}
const StyledList = styled(List)`
    ${media.mobile`
     display: flex;
    `}
    

`
const CustomTableCell = withStyles({
    body: {
        color: colors.fontTable,
        fontWeight: '100',
        fontSize: 14,
        textAlign: 'center',
        padding: '0 24px',
    },
    
})(TableCell);

const ViewerContainer = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(243, 244, 249, .9);
    z-index: 9;
`;

const ViewerCover = styled.div`
    position:relative;
    width:100%;
    min-height: 100vh;
`;

const TopToolBar = styled.div`
    width: 100%;
    text-align: right;
    padding: 30px;
    position: absolute;
`;

class MoreInfo extends React.Component {
    
    canvas = null;
    
    state = {
        openViewer: false,
        activeDICOM: null,
        activeStady: null,
        tags:[]
    }
    
    handleOpenDialog = () => {
        this.setState(
            {
                ShowDialog: true,
            }
        );
    };
    
    closeViewer = () => {
        this.setState(
            {
                openViewer: false,
                activeDICOM: null,
                activeStady: null
            }
        );
    }
    
    openViewer = (file, stady) => {
        this.setState(
            {
                openViewer: true,
                activeDICOM: file,
                activeStady : stady
            }
        );
    }
    
    view = (file, stady) => () => {
        this.openViewer(file, stady);
    }
    
    
    getAva = (filesPath) => {
        const {classes} = this.props
        const ava = (
            <Avatar
                alt="DICOMs Preview"
                src={filesPath.srcPrv}
                className={classes.avatar}
            />
        )
        return ava;
    }
    
    getListFiles = (stady) => {
        const {classes, dicomIndex} = this.props
        const files = (stady.files) ? stady.files : false;
        
        const listFiles =
            ( files && files.map ((file, index) =>
                ( file &&
                    <Button className={classes.buttonV} id={index} onClick={this.view(file, stady)}>
                        {this.getAva(file)}
                        <Icon  className={classes.iconView}><span className="icon-ico-view"/></Icon>
                    </Button>
                )
            ));
        
        return listFiles;
    }
    
    render () {
        const {classes, onClose, study, tags} = this.props;
        const {openViewer, activeDICOM, activeStady} = this.state;
        console.log(tags);
        let body = (<Loading/>)

        if (openViewer) {
            body = (
                <ViewerContainer>
                    <ViewerCover>
                    
                        <TopToolBar>
                            <IconButton onClick={this.closeViewer}
                                        className={classes.iconRoot}><div className="icon-ico-close"/></IconButton>
                    
                        </TopToolBar>
                        <Viewer {...this.props} tags={tags} open={openViewer} stady={activeStady} file={activeDICOM} handleClose={this.closeViewer}/>
                    </ViewerCover>
                </ViewerContainer>
            )
        }
        
        if (study && study.length > 0 && !openViewer) {
            body =
                study.map(s =>
                    ( s &&
                        <ListItem className={classes.listItem}>
                            <ExpansionPanel  className={classes.paper}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.iconButton}/>}>
                                    <Table className={classes.table}>
                                        <TableBody>
                                            <TableRow className={classes.row} key={s._id}>
                                                <CustomTableCell className={classes.nameRow}>
                                                    <Typography>{'Study ID: '}{s.studyID}</Typography>
                                                </CustomTableCell>
                                                <CustomTableCell className={classes.nameRow}>
                                                    <Typography> {s.patientId} {s.patientsName}</Typography>
                                                </CustomTableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.panelDetails}>
                                    <List>
                                        <ListItem className={classes.listItem}>
                                            <Paper >
                                                <Table className={classes.table}>
                                                    <TableBody>
                                                        <TableRow key={s._id}  className={classes.TableRow}>
                                                            <TableCell>{'Study ID'}</TableCell>
                                                            <TableCell>{s.studyID}</TableCell>
                                                        </TableRow>
                                                        <TableRow key={'files'}  className={classes.TableRow}>
                                                            <TableCell>{'Files to study'}</TableCell>
                                                            <TableCell>{s.files.length}</TableCell>
                                                        </TableRow>
                                                        {s.more && _.toArray(s.more).map(n =>
                                                            ( n &&
                                                                <TableRow key={n.info}  className={classes.TableRow}>
                                                                    <TableCell>{n.info}</TableCell>
                                                                    <TableCell>{(n.value) ? (n.value) : "-"}</TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                        <TableRow key={s._id}  className={classes.TableRow}>
                                                            <TableCell colspan={2}>
                                                                <div key={'items' + s._id} className={classes.list}>
                                                                    <div className={classes.dicomItem}>
                                                                        <FullColumn >
                                                                            <div className={classes.dicomsRow}>
                                                                                {this.getListFiles(s)}
                                                                            </div>
                                                                        </FullColumn>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Paper>
                                        </ListItem>
                                        <Divider/>
                                        
                                    </List>
                                   
                                    
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </ListItem>
                    )
                )
        }
        // const more = _.toArray(study.more);
        
        return (
            <div
                onClose={onClose}
                className={classes.modalBack}
            >
                <div className={classes.topBar}>
                    <Button  variant="fab" className={classes.iconButton} onClick={onClose}>
                        <div className={classes.close}/>
                    </Button>
                </div>
                <div className={classes.contentCover}>
                    {body}
                </div>
                <div className={classes.bottomBar}>
                    <Button  variant="contained" className={classes.linkButton} onClick={onClose}>
                        {trans('admin.panel.DICOMs.assign.dialog.cancel')}
                    </Button>
                </div>
            
            </div>
        )
    }
}

MoreInfo.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default (withStyles(styles))(MoreInfo)