/**
 * Hospitals
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import injectReducer from 'utils/injectReducer'
import immutableProps from 'hocs/immutableProps'
import reducer from './reducer'
import Hospitals from './components/Hospitals'
import {editHospitalAction, onEditHospitalAction} from './actions'
import { getFormValues } from 'redux-form/immutable'
import reduxForm from "../../hocs/reduxForm";

export class EditHospitalsContainer extends React.PureComponent {
  render () {
    return (
      <div>
        <Helmet>
          <title>Hospitals</title>
          <meta name="description"/>
        </Helmet>
        <Hospitals {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    hospital: state.getIn(['hospitalContainer', 'hospital']),
})


const mapDispatchToProps = (dispatch) => ({
    onEditHospital: (data) => dispatch(editHospitalAction(data)),
    onGetHospital: (data) =>  dispatch(onEditHospitalAction(data)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: 'hospitalContainer', reducer})

export default compose(
    withReducer,
    withConnect,
    immutableProps,
)(EditHospitalsContainer)
