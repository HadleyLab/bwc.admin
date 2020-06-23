import React, { PureComponent } from 'react'
import trans from 'trans'
import FullColumn from 'components/FullColumn'
import FlexBetween from 'components/FlexBetween'
import FlexCover from 'components/FlexCover'
import RoundedButton from 'components/RoundedButton'
import colors from 'style/colors'
import { withStyles } from '@material-ui/core/styles/index'
import AutocompleteMulti from "./components/AutocompleteMulti";
import HospitalList from "./components/HospitalList";
import { Subject } from 'rxjs'
import 'rxjs/add/operator/debounceTime'
import Loading from 'components/Loading';
import styled from 'styled-components';
import getUser from '../../../../utils/getUser';
import SearchField from 'components/ReduxForm/SearchField'
import Typography from '@material-ui/core/Typography';
import HospitalNotFound from "./components/HospitalNotFound";
import { Button,IconButton }from '@material-ui/core';
import {UsaStates} from 'usa-states';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import reduxForm from "../../../../hocs/reduxForm";
import {compose} from "redux";
import ContainedButton from 'components/ContainedButton'


const Cover = styled.div`
    position:relative;
    background: #E9EBF5;
    padding: .5em 1em 56px;
    height: 100%;
`

const Title = styled.h2`
    color:#000;
    font-size:22px;
    font-weight:300;
    margin:1.5em 0 0.3em;
    text-align: center;
`

const styles = theme => ({
    btnDone: {
        alignItems: 'center',
        margin: '2em auto',
    },
    cover:{
        width: "100%",
        maxWidth: "800px",
        margin: '0.5em auto',
    },
    headerCover:{
        width: "75%",
        maxWidth: "100%",
        margin: '0 auto',
        position: 'relative',
    },
    mobile:{
        '@media (max-width: 768px)':{
            width: '100%',
            flexFlow: 'column',
        },
    },
    inputColumn:{
        width: '100%',
        margin:'2em 0 0',
        flex: '0 .3 32%',
        fontSize: 20,
        '@media (max-width: 768px)':{
            marginTop: '1em',
        }
    },
    hospitals:{
        width: '100%',
        boxShadow: 'none',
    },
    subtitle:{
        textAlign: 'center',
        fontWeight: 300,
        fontSize:16,
        color:'#7A8091',
    },
    helperText:{
        fontSize:16,
    },
    button:{
        textTransform: 'none',
        padding: '0 0 0 8px',
        marginTop: -3,
        fontSize: 16,
        color: colors.brandPrimary,
        background: 'transparent',
        '&:hover':{
            color: colors.brandHover,
            background: 'transparent',
        },
        '&:active':{
            background: 'transparent',
        }
    },
    backBtn:{
        top: '20%',
        left: -16,
        color: '#000',
        position: 'absolute',
        '@media(max-width:600px)':{
            top: -8,
            left: -5,
        }
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
    },
});

const UPDATE_LIST_DELAY_TIME = 500 //ms

class FindHospital extends PureComponent {

    constructor (props) {
        super(props);
        const {onFind} = this.props;
        this.state = {
            selectHospital: null,
            sendTransfers: false,
            filter:{
                state: null,
                city: '',
                needUpdateCity: false,
                search: '',
                page: 1
            },
            cleanCityList: false,
            showCleanBtn: false,
            activeHospital: null,
            showFormNewHospital: false
        };
        onFind(this.state.filter);
    }

    componentWillMount () {
        const {onFind} = this.props;
        this.onUpdateListHospitals = new Subject();
        this.onUpdateListHospitals.debounceTime(UPDATE_LIST_DELAY_TIME).subscribe(onFind)
    }


    handleSetState = (selectState) => {
        const {change} = this.props;
        const {filter} = this.state;
        change('city', '');

        this.setState({cleanCityList: true});

        filter.city = '';
        filter.page = 1;
        filter.state = selectState.value;
        filter.needUpdateCity = true;

        this.onUpdateListHospitals.next(filter);
    };

    handleSetCity = (selectCity) => {
        const {filter} = this.state;

        this.setState({cleanCityList: false});

        filter.city = selectCity.value;
        filter.needUpdateCity = false;
        filter.page = 1;
        this.onUpdateListHospitals.next(filter);
    };

    handleSelectHospital = (hospital) => {
        this.setState({activeHospital: hospital});
    };

    handleChangeName = (value) => {
        const {filter} = this.state;
        if (value.target.value) {
            this.setState({showCleanBtn: true})
        } else {
            this.setState({showCleanBtn: false})
        }
        filter.page = 1;
        filter.search = value.target.value;
        this.onUpdateListHospitals.next(filter);
    };

    handleCleanName = () => {
        const {change} = this.props;
        const {filter} = this.state;

        this.setState({showCleanBtn: false})

        change('search', '');
        filter.search = '';
        filter.page = 1;
        this.onUpdateListHospitals.next(filter);
    };

    handleMore = () => {
        const {filter} = this.state;
        filter.page++;
        this.onUpdateListHospitals.next(filter);
    };

    done = () => {
        const {activeHospital} = this.state;
        if (activeHospital) {
            const {onRedefinition, match} = this.props;
            const data = {
                newHospital: activeHospital._id,
                oldHospital: match.params.old,
            };
            onRedefinition(data);
            location.href = '/hospitals';
        }
    };

    render () {
        const { classes, ...others} = this.props;
        const {city, hospitals, load, count, history } = this.props;
        const {sendTransfers, cleanCityList, showCleanBtn, activeHospital, filter} = this.state;
        const states = new UsaStates().states;
        const listStates = (states && states.map(state => ({
            value: state.abbreviation,
            label: state.name
        })));

        let HospitalListIsNotEmpty = false;
        let listCity = null;
        let HospitalListCont = (<HospitalNotFound {...others}/>);

        if (city) {
            listCity = (city && city.map(item => ({
                value: item,
                label: item
            })));
        }

        if (load) {
            HospitalListCont =(<Loading/>);
        }

        if (hospitals.length > 0) {
            HospitalListCont = (<HospitalList
                hospitals={hospitals}
                handleSelectHospital={this.handleSelectHospital}
                handleMore={this.handleMore} count={count}
                activeHospital={activeHospital}
                />
            ) ;
            HospitalListIsNotEmpty = true;
        }


        return (
            <Cover>

                {(!sendTransfers) ? (
                    <div>
                        <div className={classes.headerCover}>
                            <Title>{trans('redefinition.title')}</Title>
                            <Typography className={classes.subtitle}>{trans('transfer.subtitle.select.hospital')}</Typography>
                        </div>
                        <FlexCover className={classes.cover}>
                            <FlexBetween className={classes.mobile}>
                                <div className={classes.inputColumn}>
                                    <AutocompleteMulti
                                        items={listStates}
                                        name={"state"}
                                        handleInputChange={this.handleInputChange}
                                        handleChange={this.handleSetState}
                                        placeholder={trans('dialog.add.hospital.select.state')}
                                    />
                                </div>
                                <div className={classes.inputColumn}>
                                    <AutocompleteMulti
                                        items={listCity}
                                        name={"city"}
                                        handleInputChange={this.handleInputChange}
                                        handleChange={this.handleSetCity}
                                        placeholder={trans('dialog.add.hospital.select.city')}
                                        clean={cleanCityList}
                                    />
                                </div>
                                <div className={classes.inputColumn}>
                                    <SearchField
                                        onChange={this.handleChangeName}
                                        clickclean={this.handleCleanName}
                                        showCleanBtn={showCleanBtn}
                                        name="search"
                                        label={trans('dialog.add.hospital.search')} fullWidth
                                    />
                                </div>
                            </FlexBetween>

                            {
                                (load && filter.page === 1) ? (<Loading/>) : HospitalListCont
                            }

                            {(HospitalListIsNotEmpty) ? (
                                <FullColumn className={classes.btnDone}>
                                    <div>
                                    <ContainedButton
                                        color='primary'
                                        onClick={this.done}
                                    >{trans('dialog.add.hospital.redefinition.btn')}
                                    </ContainedButton>
                                    </div>
                                </FullColumn>
                            ): null}
                            <FullColumn className={classes.btnDone}>
                                <div>
                                <Button
                                    onClick={()=> {history.push('/hospitals')}}
                                    className={classes.linkButton} variant="contained">
                                    {trans('admin.panel.DICOMs.assign.dialog.cancel')}
                                </Button>
                                </div>
                            </FullColumn>
                        </FlexCover>
                    </div>
                ): (
                    <div>
                        <Loading/>
                    </div>
                )}
            </Cover>
        )
    }
}

export default compose(
    withStyles(styles),
    reduxForm('search')
)(FindHospital);

