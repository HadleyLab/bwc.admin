/**
 * Transfers
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import immutableProps from 'hocs/immutableProps'
import Transfer from './components/Transfer'
import {getListTransfersAction, updateTransfersStatusAction} from './actions'
import { connect } from 'react-redux'
import { makeTransfers } from './selectors'
import injectReducer from '../../utils/injectReducer'
import reducer from './reducer'

export class TransfersContainer extends React.PureComponent {

    componentWillMount() {
        const { onGetListTransfers } = this.props;
        onGetListTransfers();
    }

    render () {
        return (
            <div>
                <Helmet>
                    <title></title>
                    <meta name="description"/>
                </Helmet>
                <Transfer {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    transfers: state.getIn(['transferContainer', 'transfers']),
    count: state.getIn(['transferContainer', 'count']),
})

const mapDispatchToProps = (dispatch) => ({
    onGetListTransfers: (data) => dispatch(getListTransfersAction(data)),
    onUpdateTransfersStatus: (data) => dispatch(updateTransfersStatusAction(data)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: 'transferContainer', reducer})

export default compose(
    withReducer,
    withConnect,
    immutableProps,
)(TransfersContainer)
