import { Component } from 'react';
import PropTypes from 'prop-types';

export default class MuiPickersUtilsProvider extends Component {
  static childContextTypes = {
    muiPickersDateUtils: PropTypes.object,
  }

  getChildContext() {
    const { utils: Utils, locale, moment } = this.props;
    return {
      muiPickersDateUtils: new Utils({ locale, moment }),
    };
  }

  render() {
    return this.props.children;
  }
}
