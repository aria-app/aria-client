import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, setPropTypes, withHandlers } from 'recompose';
import { getLetter } from '../../helpers/zen-pitches/zen-pitches';
import { getFrequency } from '../../helpers/zen-scale/zen-scale';
import './zen-keys.scss';

const component = ({ keys }) =>
  h('.zen-keys', keys);

const key = ({ note, playNote }) =>
  h('.zen-keys__key', {
    className: `zen-keys__key--${getLetter(note.pitch)}`,
    onMouseUp: () => playNote(note),
  }, [
    h('.zen-keys__key__label', [
      getLabel(note),
    ]),
  ]);

export const ZenKeys = compose([
  withHandlers({
    playNote: ({ synth }) => note => synth.triggerAttackRelease(
      getFrequency(note),
      '8n'
    ),
  }),
  mapProps(({ scale, playNote, ...rest }) => ({
    keys: scale.map(note => key({ note, playNote })),
    ...rest,
  })),
  setPropTypes({
    scale: PropTypes.array,
  }),
])(component);

function getLabel(note) {
  return getLetter(note.pitch).toUpperCase() + String(note.octave);
}
