import { includes } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './keys.scss';

const { scale } = shared.constants;

export class Keys extends React.Component {
  static propTypes = {
    onKeyPress: React.PropTypes.func.isRequired,
  }

  render() {
    return h('.keys', [
      ...scale.map(step => h('.keys__key', {
        className: getKeyClasses(step),
        onMouseUp: () => this.handleKeyPress(step),
      }, [
        h('.keys__key__label', [
          step.name,
        ]),
      ])),
    ]);
  }

  handleKeyPress = (step) => {
    this.props.onKeyPress({
      y: step.y,
    });
  }
}

function getKeyClasses(step) {
  const letter = step.name.slice(0, 1).toLowerCase();
  const suffix = includes('#')(step.name)
    ? 'sharp'
    : '';
  return `keys__key--${letter}${suffix}`;
}
