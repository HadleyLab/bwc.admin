/**
 *
 * FindHospital
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { compose } from 'redux'

import injectReducer from 'utils/injectReducer'
import { makeSelectErrors } from './selectors'
import reducer from './reducer'
import FindHospital from './components/FindHospital'
import immutableProps from 'hocs/immutableProps'
import trans from '../../trans'
import {FindAction, redefinitionAction} from "./actions";

import { getFormValues } from 'redux-form/immutable';


export class FindHospitalContainer extends React.PureComponent {

    render () {
        return (
            <div>
                <Helmet>
                    <title>{trans('title.login')}</title>
                    <meta name="description" content={trans('title.login')}/>
                </Helmet>
                <FindHospital  {...this.props}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    hospitals: state.getIn(['hospitalsContainer', 'hospitals']),
    count: state.getIn(['hospitalsContainer', 'count']),
    city: state.getIn(['hospitalsContainer', 'city']),
    load: state.getIn(['hospitalsContainer', 'load']),
});

const mapDispatchToProps = (dispatch) => ({
    onFind: (data) => dispatch(FindAction(data)),
    onRedefinition: (data) => dispatch(redefinitionAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: 'hospitalsContainer', reducer});

export default compose(
    withReducer,
    withConnect,
    immutableProps,
)(FindHospitalContainer)
