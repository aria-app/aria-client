import { PropTypes } from 'react';
import { connect } from 'react-redux';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, mapProps, onlyUpdateForKeys, setPropTypes, withHandlers } from 'recompose';
import sound from 'sound';
import { drawNote } from '../../actions';
import selectors from '../../selectors';
import './slots.scss';

const { playNote } = sound.model;

const component = ({ rows }) => h('.slots', rows);

const composed = compose([
  setPropTypes({
    measureCount: PropTypes.number,
    requestDrawNote: PropTypes.func,
  }),
  withHandlers({
    handleSlotPress: ({ requestDrawNote }) => (slot, time) => {
      playNote(slot.frequency, '32n');
      requestDrawNote({
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
    scale,
    }) => ({
      rows: getRows(handleSlotPress, measureCount, scale),
    })
  ),
  onlyUpdateForKeys(['measureCount']),
])(component);

export const Slots = connect(mapState, mapDispatch)(composed);

function mapState(state) {
  return {
    measureCount: selectors.getMeasureCount(state),
    scale: selectors.getScale(state),
    tool: selectors.getTool(state),
  };
}

function mapDispatch(dispatch) {
  return {
    requestDrawNote: note => {
      dispatch(drawNote(note));
    },
  };
}

function getRows(handleSlotPress, measureCount, scale) {
  return scale.map(scaleStep => h('.slots__row', {
    className: `slots__row--${scaleStep.letter}`,
  }, _.times(4 * measureCount, sectionNumber =>
    h('.slots__row__section', _.times(8, n =>
      h('.slots__slot', {
        onClick: () => handleSlotPress(scaleStep, n + sectionNumber * 8),
      }, h('.slots__slot__fill'))
    ))
  )));
}
