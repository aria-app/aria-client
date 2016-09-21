import { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import './keys.scss';

const component = props => h('.keys', props.keys);

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

const composed = compose(
  setDisplayName('Keys'),
  pure,
  setPropTypes({
    previewNote: PropTypes.func,
    scale: PropTypes.array,
  }),
  withHandlers({
    handleKeyPress: ({ previewNote }) => step =>
      previewNote({ y: step.y }),
  }),
  mapProps(({ handleKeyPress, scale, ...rest }) => ({
    keys: scale.map(step => h(keyComponent, {
      handleKeyPress,
      step,
    })),
    ...rest,
  })),
)(component);

export const Keys = composed;

function getKeyClasses(step) {
  const letter = step.name.slice(0, 1).toLowerCase();
  const suffix = _.includes(step.name, '#')
    ? 'sharp'
    : '';
  return `keys__key--${letter}${suffix}`;
}
