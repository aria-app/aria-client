import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import './keys.scss';

const component = ({ keys }) => h('.keys', keys);

const keyComponent = ({
  handleKeyPress,
  scaleStep,
}) => h('.keys__key', {
  className: `keys__key--${scaleStep.letter}`,
  onMouseUp: () => handleKeyPress(scaleStep),
}, [
  h('.keys__key__label', [
    getLabel(scaleStep),
  ]),
]);

const composed = compose([
  setPropTypes({
    playNote: PropTypes.func,
    scale: PropTypes.array,
  }),
  withHandlers({
    handleKeyPress: ({ playNote }) => scaleStep =>
      playNote(scaleStep.frequency, '8n'),
  }),
  mapProps(({ handleKeyPress, scale, ...rest }) => ({
    keys: scale.map(scaleStep => h(keyComponent, {
      handleKeyPress,
      scaleStep,
    })),
    ...rest,
  })),
  pure,
])(component);

export const Keys = composed;

function getLabel(scaleStep) {
  return scaleStep.letter.toUpperCase() + String(scaleStep.octave);
}
