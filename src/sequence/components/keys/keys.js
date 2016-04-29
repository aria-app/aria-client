import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import sound from 'sound';
import './keys.scss';

const { playNote } = sound.model;

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
    scale: PropTypes.array,
    synth: PropTypes.string,
  }),
  withHandlers({
    handleKeyPress: () => scaleStep => playNote(scaleStep.frequency, '8n'),
  }),
  mapProps(({ handleKeyPress, scale, ...rest }) => ({
    keys: scale.map(scaleStep => h(keyComponent, { scaleStep, handleKeyPress })),
    ...rest,
  })),
  pure,
])(component);

export const Keys = composed;

function getLabel(scaleStep) {
  return scaleStep.letter.toUpperCase() + String(scaleStep.octave);
}
