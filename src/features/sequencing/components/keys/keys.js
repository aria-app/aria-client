import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './keys.scss';

const scale = shared.helpers.getScale();

export class Keys extends React.Component {
  static propTypes = {
    previewNote: React.PropTypes.func.isRequired,
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
    this.props.previewNote({
      y: step.y,
    });
  }
}

function getKeyClasses(step) {
  const letter = step.name.slice(0, 1).toLowerCase();
  const suffix = _.includes(step.name, '#')
    ? 'sharp'
    : '';
  return `keys__key--${letter}${suffix}`;
}
