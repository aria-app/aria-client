import { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import './keys.scss';

const component = ({ keys }) => h('.keys', keys);

const keyComponent = ({
  handleKeyPress,
  step,
}) => h('.keys__key', {
  className: getKeyClasses(step),
  onMouseUp: () => handleKeyPress(step),
}, [
  h('.keys__key__label', [
    step.name,
  ]),
]);

const composed = compose([
  setPropTypes({
    playNote: PropTypes.func,
    scale: PropTypes.array,
  }),
  withHandlers({
    handleKeyPress: ({ playNote }) => step =>
      playNote(step.name, '8n'),
  }),
  mapProps(({ handleKeyPress, scale, ...rest }) => ({
    keys: scale.map(step => h(keyComponent, {
      handleKeyPress,
      step,
    })),
    ...rest,
  })),
  pure,
])(component);

export const Keys = composed;

function getKeyClasses(step) {
  const letter = step.name.slice(0, 1).toLowerCase();
  const suffix = _.includes(step.name, '#')
    ? 'sharp'
    : '';
  return `keys__key--${letter}${suffix}`;
}
