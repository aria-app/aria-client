import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import sound from 'sound';
import './keys.scss';

const { getFrequency, getLetter, scale } = sound.model;

const component = ({ keys }) =>
  h('.keys', keys);

const key = ({ note, playNote }) =>
  h('.keys__key', {
    className: `keys__key--${getLetter(note.pitch)}`,
    onMouseUp: () => playNote(note),
  }, [
    h('.keys__key__label', [
      getLabel(note),
    ]),
  ]);

export const Keys = compose([
  setPropTypes({
    synth: PropTypes.object,
  }),
  withHandlers({
    playNote: ({ synth }) => note => synth.triggerAttackRelease(
      getFrequency(note),
      '8n'
    ),
  }),
  mapProps(({ playNote, ...rest }) => ({
    keys: scale.map(note => key({ note, playNote })),
    ...rest,
  })),
  pure,
])(component);

function getLabel(note) {
  return getLetter(note.pitch).toUpperCase() + String(note.octave);
}
