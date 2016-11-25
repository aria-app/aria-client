import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './keys.scss';

export class Keys extends React.Component {
  static propTypes = {
    previewNote: React.PropTypes.func.isRequired,
    scale: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  render() {
    return h('.keys', [
      ...this.props.scale.map(step => h('.keys__key', {
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
