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
import Annotations from './components/Annotations'
import { getListAnnotationsAction, delAnnotationAction, editAnnotationAction, onEditAnnotationAction, createAnnotationAction} from './actions'
import trans from 'trans'

export class AnnotationsContainer extends React.PureComponent {
  render () {
    return (
      <div>
        <Helmet>
          <title>{trans('admin.panel.annotation')}</title>
          <meta name="description"/>
        </Helmet>
        <Annotations {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  annotations: state.getIn(['annotationsContainer', 'annotations']),
})

const mapDispatchToProps = (dispatch) => ({
    onGetListAnnotations: (data) => dispatch(getListAnnotationsAction(data)),
    onDelAnnotation: (data)  => dispatch(delAnnotationAction(data)),
    onEditAnnotation: (data) => dispatch(editAnnotationAction(data)),
    onCreateAnnotation: (data) => dispatch(createAnnotationAction(data)),
    onGetAnnotation: (data) => dispatch(onEditAnnotationAction(data)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({key: 'annotationsContainer', reducer})

export default compose(
    withReducer,
    withConnect,
    immutableProps,
)(AnnotationsContainer)
