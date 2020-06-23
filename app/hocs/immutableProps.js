import React from 'react' // eslint-disable-line
import { reduce } from 'lodash'

export const immutableToProps = (props) => reduce(props, (props, value, key) => {
  if (value && typeof value.toJS === 'function') {
    props[key] = value.toJS()
  } else {
    props[key] = value
  }
  return props
}, {});

export default (BaseComponent) => (props) => (
  <BaseComponent {...immutableToProps(props)} />
)
