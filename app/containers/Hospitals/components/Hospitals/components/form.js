import React from 'react';
import {UsaStates} from 'usa-states';
import trans from 'trans'
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FullColumn from 'components/FullColumn';
import HalfColumn from 'components/HalfColumn';
import FlexBetween from 'components/FlexBetween';
import TextField from 'components/ReduxForm/TextFieldBig'
import SelectField from 'components/ReduxForm/SelectField'
import ErrorText from 'components/ErrorText'
import reduxForm from 'hocs/reduxForm'
import formReducer from './reducer'
import { compose } from 'redux'
import injectReducer from 'utils/injectReducer'
import Close from '../../../../../components/Img/ico-Close.svg'
import colors from "../../../../../style/colors";
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ContainedButton from 'components/ContainedButton'
import toJS from "../../../../../utils/toJS";
import allTrim from '../../../../../utils/allTrim'

const styles = {
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
    title: {
        textAlign: 'center',
        fontWeight: '300',
        fontSize: '2em',
        margin: '1em 0',
        '@media(max-width: 1366px)':{
            fontSize: '1.5em',
            margin:'0 auto 0.5em',
        }
    },
    inputBlock: {
        height : '40px'
    },
    inputH: {
        height : '45px'
    },
    contentCover: {
        width: 720,
        maxWidth: '100%',
        display: 'flex',
        flexFlow: 'column',
        margin: '1em auto',
        '@media(max-width: 1366px)':{
            margin:'0 auto',
        }
    },
    button: {
        height: 54,
        margin: '1em auto',
        textTransform: 'none',
        fontSize: 16,
        padding:'1em 2.2em',
        '@media(max-width: 1366px)':{
            margin:'0 auto .5em',
            padding:'.7em 2em',
            height: 48,
        }
    },
    topBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 0.5em',
        width: '100%',
        height: '0',
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
        top:30,
        right:22,
        position: 'relative',
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
            border: '1px solid red',
        },
    },
    dicomName:{
        color:'rgba(35, 35, 77, 0.6)',
        fontSize: 14,
        fontWeight: 100,
    },
    action:{
        alignItems: 'center',
    },
    btnSave:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
};


class FormHospital extends React.Component {

    constructor (props) {
        super(props);
        const {typeList} = this.props;

        this.state = {
            stateH: null,
            condition: (typeList !== "active") ? false : true
        }
    }

    handleSave = (e) => {
    
        const {onEditHospital, handleSubmit, saveHospital, idHospital, onCreateHospital, reset, valid} = this.props;
        e.preventDefault();

        const save = (idHospital) ? onEditHospital : onCreateHospital;
        const submitter = handleSubmit(save);
        let resultSubmitter = submitter();
        if (typeof (resultSubmitter.then) === 'function') {
            resultSubmitter.then(() => {
                saveHospital();
                reset();
            });
        }
    
        return false;
    }

    closeForm = () => {
        const { handleCloseDialog, reset} = this.props;
        reset();
        this.setState({
            stateH: null,
            condition: null,
        })
        handleCloseDialog();
    }

    handleChange = event => {
        const {change} = this.props;
        change('state', event.target.value)
        this.setState({ stateH: event.target.value });
    };

    handleChangeCondition = event => {
        const {change} = this.props;
        change('active', event.target.value)
        this.setState({ condition: event.target.value });
    };

    render() {
        const {classes, error, showD, titleForm, hospital} = this.props;
        const states = new UsaStates().states;
        const { stateH, condition } = this.state;
        const valueState = (!stateH && hospital) ? hospital.state : stateH

        const input = {
            value: valueState,
            name: "state",
            focused: (valueState !== null) ? true : false,
            onChange: this.handleChange
        }

        const inputCondition = {
            value: condition,
            name: "active",
            focused: false,
            onChange: this.handleChangeCondition
        }

        return (showD &&
            <div className={classes.modalBack}>

                    <div className={classes.topBar}>
                        <Button  variant="fab" className={classes.iconButton} onClick={this.closeForm}>
                            <div className={classes.close}/>
                        </Button>
                    </div>
                <form onSubmit={this.handleSave}>
                        <div className={classes.contentCover}>
                            <h3 className={classes.title}>{trans(titleForm)}</h3>
                                    <FullColumn>
                                        <FullColumn>
                                            <SelectField name="active" label={trans('admin.panel.hospitals.condition')} input={inputCondition} focused={(inputCondition.focused)} fullWidth>
                                                <MenuItem value={true}>
                                                    Active
                                                </MenuItem>
                                                <MenuItem value={false}>
                                                    Deactive
                                                </MenuItem>
                                            </SelectField>
                                        </FullColumn>
                                        <FullColumn>
                                            <TextField name="name" type="text" label={trans('admin.panel.hospitals.action.form.field.name')} fullWidth/>
                                        </FullColumn>
                                        <FullColumn>
                                            <TextField name="address" type="text" label={trans('admin.panel.hospitals.address')} fullWidth/>
                                        </FullColumn>
                                        <FullColumn>
                                            <FlexBetween>
                                                <HalfColumn>
                                                    <SelectField name="state" label={trans('admin.panel.hospitals.state')} input={input} focused={(input.focused)} fullWidth >
                                                        {states && states.map(state => (
                                                            <MenuItem value={state.abbreviation}>{state.name}</MenuItem>
                                                            )
                                                        )}
                                                    </SelectField>
                                                </HalfColumn>
                                                <HalfColumn>
                                                    <FlexBetween>
                                                        <HalfColumn>
                                                            <TextField name="city"  type="text" label={trans('admin.panel.hospitals.city')} fullWidth/>
                                                        </HalfColumn>
                                                        <HalfColumn>
                                                            <TextField name="zip" type="text" label={trans('admin.panel.hospitals.zip')} fullWidth/>
                                                        </HalfColumn>
                                                    </FlexBetween>
                                                </HalfColumn>
                                            </FlexBetween>
                                        </FullColumn>
                                        <FullColumn>
                                            <FlexBetween>
                                                <HalfColumn>
                                                    <TextField name="phone" type="text" label={trans('admin.panel.hospitals.phone')} fullWidth/>
                                                </HalfColumn>
                                                <HalfColumn>
                                                  <TextField name="hospitalID" type="text" label={trans('admin.panel.hospitals.users.hospitalID')} fullWidth/>
                                                </HalfColumn>
                                            </FlexBetween>
                                        </FullColumn>
                                        <FullColumn>
                                            <FlexBetween>
                                                <HalfColumn>
                                                    <TextField name="contactPerson_firstName" type="text" label={trans('admin.panel.hospitals.action.form.field.contact.persons.firstname')} fullWidth/>
                                                </HalfColumn>
                                                <HalfColumn>
                                                    <TextField name="contactPerson_lastName" type="text" label={trans('admin.panel.hospitals.action.form.field.contact.persons.lastname')} fullWidth/>
                                                            </HalfColumn>
                                            </FlexBetween>
                                        </FullColumn>
                                        <FullColumn>
                                            <TextField name="contactPerson_email" type="text" label={trans('admin.panel.hospitals.action.form.field.contact.persons.email')} fullWidth/>
                                        </FullColumn>
                                    </FullColumn>
                                    {error && (
                                        <ErrorText>{error}</ErrorText>
                                    )}
                            <div className={classes.btnSave}>
                                <div>
                                    <ContainedButton type={"submit"} className={classes.button} color="primary">
                                    {trans('admin.panel.btn.save')}
                                    </ContainedButton>
                                </div>
                            </div>
                        </div>
                </form>
                        <div className={classes.bottomBar}>
                            <Button onClick={this.closeForm} variant="contained" className={classes.linkButton}>
                            {trans('admin.panel.DICOMs.assign.dialog.cancel')}
                            </Button>
                        </div>

            </div>
        );
    }
}

FormHospital.propTypes = {
    classes: PropTypes.object.isRequired,
}

const withReducer = injectReducer({key: 'form', reducer: formReducer})

const validate = _values => {
    const values = toJS(_values)
    const errors = {}

    allTrim(values);
    
    if (!values.name) {
        errors.name = trans('validation.joi.hospital.empty.name')
    }
    if (!values.address) {
        errors.address = trans('validation.joi.hospital.empty.address')
    }
    if (!values.state) {
        errors.state = trans('validation.joi.hospital.empty.state')
    }
    if (!values.city) {
        errors.city = trans('validation.joi.hospital.empty.city')
    }
    if (!values.contactPerson_firstName ) {
        errors.contactPerson_firstName = trans('validation.joi.hospital.empty.contactPerson_firstName')
    }
    if (!values.contactPerson_lastName) {
        errors.contactPerson_lastName = trans('validation.joi.hospital.empty.contactPerson_lastName')
    }
    if (!values.contactPerson_email) {
        errors.contactPerson_email = trans('validation.joi.hospital.empty.contactPerson_email')
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contactPerson_email)) {
        errors.contactPerson_email = trans('validation.joi.register.email.email')
    }

    return errors
}


export default compose(
    reduxForm('HForm', validate),
    withReducer,
    withStyles(styles),
)(FormHospital)