import React, { PureComponent } from 'react'
import trans from 'trans'
import queryString from "query-string"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index'
import colors from '../../../../style/colors'
import AppBar from '@material-ui/core/AppBar';
import Logo from 'components/Logo'
import FlexedBetween from 'components/FlexBetween'
import HalfColumn from 'components/HalfColumn'
import FlexedCover from 'components/FlexCover'
import RoundedButton from '../../../../components/RoundedButton'
import FlexCenter from 'components/FlexCenter'
import TextField from 'components/ReduxForm/TextFieldWhite'
import { Subject } from 'rxjs'
import Link from 'components/Link'
import 'rxjs/add/operator/debounceTime'
import formReducer from '../../reducerForm'
import reduxForm from '../../../../hocs/reduxForm'
import injectReducer from '../../../../utils/injectReducer'
import { compose } from 'redux'
import allTrim from "../../../../utils/allTrim";
import toJS from "../../../../utils/toJS";

const styles = {
    bar:{
        boxShadow: 'none',
        background: 'transparent',
        padding: '10px 40px',
        width: '100%',
    },
    modalBack: {
        backgroundColor: 'rgba(243, 244, 249, 1)',
        position: 'fixed',
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '10',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title:{
        textAlign: 'center',
        color:'#9497A2',
        fontSize: 16,
        margin: '0 30px 0',
        fontWeight: 100,
    },
    hospital: {
        fontFamily: 'Prata',
        textAlign: 'center',
        fontWeight: '300',
        fontSize: '2em',
        color: '#040429',
        margin: '0.5em 0',
    },
    contentCover: {
        maxWidth: '100%',
        display: 'flex',
        flexFlow: 'column',
        textAlign: 'center',
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
    barSearch:{
        boxShadow: 'none',
        backgroundColor: colors.white,
        marginBottom: 16,
    },
    button: {
        fontSize: 18,
        color: '#73738b',
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
    },

    buttonContainer:{
        width: 'auto',
        position: 'absolute',
        right: 0,
    },
    link:{
        fontSize:12,
        color: '#9497A2',
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover':{
            color: '#3690C6',
        }
    },
    copyRight:{
        fontSize:12,
        fontWeight: 200,
        color: '#9497A2',
    },
    flexedCover:{
        marginTop:'3em',
    },
    column:{
        marginBottom: 18,
    }
};

class HospitalEdit extends PureComponent {

    constructor (props) {
        super(props);
        this.state = {
          save: false,
        };
    }

     componentWillMount() {
      const { onGetHospital, match} = this.props;
      const hash = match.params.hash;
      if (hash) {
        onGetHospital({hash})
      }
    }

    handleSave = (e) => {
        const {onEditHospital, handleSubmit} = this.props;
        e.preventDefault();
        
        const submitter = handleSubmit(onEditHospital);

        let resultSubmitter = submitter();
        if (typeof (resultSubmitter.then) === 'function') {
            resultSubmitter.then(() => {
                this.setState({save:true})
            });
        }
    
        return false;

    }

    render () {
        const { classes, error, hospital} = this.props;
        const { save } = this.state;

        if (!hospital) {
            return null;
        }

        let body = (
          <form>
            <h3 className={classes.title}>{trans('edit.hospital.details.title')}</h3>
            <h4 className={classes.hospital} >{hospital.name}</h4>
            <FlexedCover className={classes.flexedCover}>
                <HalfColumn>
                  <TextField name="contactPerson_firstName"   label={trans('edit.hospital.forms.contact.person.first.name')} fullWidth/>
                </HalfColumn>
                <HalfColumn>
                  <TextField name="contactPerson_lastName" label={trans('edit.hospital.forms.contact.person.last.name')} fullWidth/>
                </HalfColumn>
                <HalfColumn>
                  <TextField name="contactPerson_email" type="email" label={trans('edit.hospital.forms.email')} fullWidth/>
                </HalfColumn>
                <HalfColumn>
                  <TextField name="hospitalID" label={trans('edit.hospital.forms.id')} fullWidth/>
                </HalfColumn>
                {error && (
                  <ErrorText>{error}</ErrorText>
                )}
                <FlexCenter>
                  <RoundedButton onClick={this.handleSave} variant='contained'
                                 color="primary">{trans('edit.hospital.save.btn')}</RoundedButton>
                </FlexCenter>
            </FlexedCover>
          </form>
        );

        if(save) {
          body = (
            <h3 className={classes.title}>{trans('edit.hospital.forbidden')}</h3>
          );
        }

        return (
              <div className={ classes.modalBack }>
                  <AppBar position="static" color="default" className={classes.bar}>
                      <Logo/>
                  </AppBar>
                {body}
                  <div className={classes.bottomBar}>
                      <FlexedBetween>
                          <p className={classes.copyRight}>{trans('footer.copyrights')}</p>
                          <Link to='/' className={classes.link}>{trans('footer.privacy.policy')}</Link>

                      </FlexedBetween>
                  </div>
              </div>
        )
    }
}

HospitalEdit.propTypes = {
  classes: PropTypes.object.isRequired,
}

const withReducer = injectReducer({key: 'form', reducer: formReducer})

const validate = _values => {
    const values = toJS(_values)
    const errors = {}
    
    allTrim(values);
    
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
  reduxForm('editHospital', validate),
  withReducer,
  withStyles(styles),
)(HospitalEdit)
