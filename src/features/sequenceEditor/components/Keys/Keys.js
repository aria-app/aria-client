import Dawww from 'dawww';
import PropTypes from 'prop-types';
import React from 'react';
import { Key } from '../Key/Key';
import './Keys.scss';

export class Keys extends React.PureComponent {
  static propTypes = {
    onKeyPress: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div
        className="keys">
        {this.getScale().map((step, index) => (
          <Key
            key={step.y}
            onMouseDown={this.handleKeyMouseDown}
            step={step}
            style={{
              borderBottomRightRadius: index === this.getScale().length - 1 ? 4 : '',
              boxShadow: index === this.getScale().length - 1
                ? '2px 2px 0 rgba(235, 235, 235, 0.5)'
                : '',
              borderTopRightRadius: index === 0 ? 4 : '',

            }}
          />
        ))}
      </div>
    );
  }

  getScale = () => Dawww.SCALE;

  handleKeyMouseDown = (step) => {
    this.props.onKeyPress(step.y);
  }
}
