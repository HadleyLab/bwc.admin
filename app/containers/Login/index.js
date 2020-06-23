/**
 *
 * Login
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import injectReducer from 'utils/injectReducer'
import { makeSelectErrors } from './selectors'
import reducer from './reducer'
import Login from './components/Login'
import immutableProps from 'hocs/immutableProps'
import logIn from 'utils/logIn'
import reduxForm from 'hocs/reduxForm'
import toJS from '../../utils/toJS'
import trans from '../../trans'
import { loginApi } from './api'

export class LoginContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <Helmet>
          <title>{trans('title.login')}</title>
          <meta name="description" content={trans('title.login')}/>
        </Helmet>
        <Login {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
})

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data) => loginApi(data).then(logIn)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({key: 'login', reducer})

const validate = _values => {
  const values = toJS(_values)
  const errors = {}
  if (!values.email) {
    errors.email = trans('validation.joi.register.empty.email')
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = trans('validation.joi.register.email.email')
  }
  if (!values.password) {
    errors.password = trans('validation.joi.register.empty.password')
  }
  return errors
}

export default compose(
  withReducer,
  withConnect,
  reduxForm('login', validate),
  immutableProps,
)(LoginContainer)
