import { PropTypes } from 'react';
import { connect } from 'react-redux';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, mapProps, onlyUpdateForKeys, setPropTypes, withHandlers } from 'recompose';
import { drawNote } from '../../actions';
import sound from 'sound';
import {
  getMeasureCount,
  getSynth,
  getTool,
} from '../../selectors';
import './slots.scss';

const { getFrequency, getLetter, scale } = sound.model;

const component = ({ rows }) =>
  h('.slots', rows);

const composed = compose([
  setPropTypes({
    measureCount: PropTypes.number,
    synth: PropTypes.object,
    onSlotPress: PropTypes.func,
  }),
  withHandlers({
    handleSlotPress: ({ onSlotPress, synth }) => (slot, time) => {
      synth.triggerAttackRelease(getFrequency(slot), '32n');
      onSlotPress({
        octave: slot.octave,
        pitch: slot.pitch,
        length: '32n',
        time,
      });
    },
  }),
  mapProps(({
    handleSlotPress,
    measureCount,
    }) => ({
      rows: getRows(handleSlotPress, measureCount),
    })
  ),
  onlyUpdateForKeys(['measureCount']),
])(component);

export const Slots = connect(
  (state) => {
    return {
      measureCount: getMeasureCount(state),
      synth: getSynth(state),
      tool: getTool(state),
    };
  },
  dispatch => {
    return {
      requestDrawNote: note => {
        dispatch(drawNote(note));
      },
    };
  }
)(composed);

function getRows(handleSlotPress, measureCount) {
  return scale.map(step => h('.slots__row', {
    className: `slots__row--${getLetter(step.pitch)}`,
  }, _.times(4 * measureCount, sectionNumber =>
    h('.slots__row__section', _.times(8, n =>
      h('.slots__slot', {
        onClick: () => handleSlotPress(step, n + sectionNumber * 8),
      }, h('.slots__slot__fill'))
    ))
  )));
}
