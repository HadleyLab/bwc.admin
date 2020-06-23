/**
 *
 * DicomsPending
 *
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import immutableProps from 'hocs/immutableProps'
import Dicoms from './components/Dicoms'
import { getListPackagesAction, getListTransfersAction, assignTransferAction, getListStudyAction, getListAnnotationsAction, saveDicomAction} from './actions'
import { connect } from 'react-redux'

import { makeDicom, makeTransfers, makeStudy, makeCount, makeTags} from './selectors'
import reducer from './reducer'
import injectReducer from '../../utils/injectReducer'

const codeFilterByTransfer = 'notAssignedNow';

export class DicomsAssignedContainer extends React.PureComponent {

    componentWillMount() {
        const {onGetListTranfers, onGetListTags} = this.props;
        onGetListTranfers({filter:codeFilterByTransfer, count:1000});
        onGetListTags();
    }

    render () {
        return (
            <div>
                <Helmet>
                    <meta name="description"/>
                </Helmet>
                <Dicoms {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    transfers: makeTransfers(),
    study: makeStudy(),
    dicoms: makeDicom(),
    count: makeCount(),
    tags: makeTags(),
})

const mapDispatchToProps = (dispatch) => ({
    onGetListDicom: (data) => dispatch(getListPackagesAction(data)),
    onGetListStudy: (data) => dispatch(getListStudyAction(data)),
    onGetListTranfers: (data) => dispatch(getListTransfersAction(data)),
    onAssignTransfer: (data) => dispatch(assignTransferAction(data)),
    onGetListTags: (data) => dispatch(getListAnnotationsAction(data)),
    onSaveDicom: (data) => dispatch(saveDicomAction(data)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: 'dicomContainer', reducer})

export default compose(
    withReducer,
    withConnect,
    immutableProps,
)(DicomsAssignedContainer)
