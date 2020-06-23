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
import { getListHospitalsAction, delHospitalAction, editHospitalAction, onEditHospitalAction, createHospitalAction} from './actions'
import { getFormValues } from 'redux-form/immutable'

export class HospitalsContainer extends React.PureComponent {
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
    hospitals: state.getIn(['hospitalsContainer', 'hospitals']),
    count: state.getIn(['hospitalsContainer', 'count']),
    formData: getFormValues('SearchForm')(state),
})

const mapDispatchToProps = (dispatch) => ({
    onGetListHospitals: (data) => dispatch(getListHospitalsAction(data)),
    onDelHospital: (data)  => dispatch(delHospitalAction(data)),
    onDelAndLoad: ({id, ...data})  => {
        dispatch(delHospitalAction({id}))
        .then(() => dispatch(getListHospitalsAction(data)))
    },
    onEditHospital: (data) => dispatch(editHospitalAction(data)),
    onCreateHospital: (data) => dispatch(createHospitalAction(data)),
    onGetHospital: (data) => dispatch(onEditHospitalAction(data)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: 'hospitalsContainer', reducer})

export default compose(
    withReducer,
    withConnect,
    immutableProps,
)(HospitalsContainer)
