import PropTypes from 'prop-types';
import React from 'react';
import './Shell.scss';

export class Shell extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div
        className="shell"
        {...this.props}
      />
    );
  }
}
