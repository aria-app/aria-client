import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import './Shell.scss';

export class Shell extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return h('.shell', this.props);
  }
}
