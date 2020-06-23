/**
 * Users
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import immutableProps from 'hocs/immutableProps'
import Users from './components/Users'
import {getListUsersAction, updateUsersStatusAction} from './actions'
import { connect } from 'react-redux'
import { makeUsers } from '../Users/selectors'
import injectReducer from '../../utils/injectReducer'
import reducer from '../Users/reducer'

export class UsersContainer extends React.PureComponent {

    render () {
        return (
            <div>
                <Helmet>
                    <title></title>
                    <meta name="description"/>
                </Helmet>
                <Users {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.getIn(['usersContainer', 'users']),
    count: state.getIn(['usersContainer', 'count']),
})
const mapDispatchToProps = (dispatch) => ({
    onGetListUsers: (data) => dispatch(getListUsersAction(data)),
    onUpdateUsersStatus: (data) => dispatch(updateUsersStatusAction(data)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: 'usersContainer', reducer})

export default compose(
    withReducer,
    withConnect,
    immutableProps,
)(UsersContainer)
