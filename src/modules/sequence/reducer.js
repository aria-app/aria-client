import _ from 'lodash';
import actionTypes from './actionTypes';
import sound from 'modules/sound';
import { defaultSynthType, defaultToolType } from './constants';

const { createNote, getScale } = sound.helpers;

export default function reducer(state = getInitialStateWithNotes(), action) {
  switch (action.type) {
    case actionTypes.DELETE_NOTES:
      return _.assign({}, state, {
        notes: _.difference(state.notes, action.notes),
        selectedNotes: [],
      });
    case actionTypes.DRAW_NOTE:
      return _.assign({}, state, {
        notes: state.notes.concat(createNote(action.note)),
      });
    case actionTypes.ERASE_NOTE:
      return _.assign({}, state, {
        notes: _.without(state.notes, action.note),
      });
    case actionTypes.SELECT_NOTES:
      return _.assign({}, state, {
        selectedNotes: action.notes,
      });
    case actionTypes.SET_MEASURE_COUNT:
      return _.assign({}, state, {
        measureCount: action.measureCount,
      });
    case actionTypes.SET_SYNTH_TYPE:
      return _.assign({}, state, {
        synthType: action.synthType,
      });
    case actionTypes.SET_TOOL_TYPE:
      return _.assign({}, state, {
        toolType: action.toolType,
      });
    default:
      return state;
  }
}

function getInitialStateWithNotes() {
  return _.assign({}, getInitialState(), {
    notes: [
      createNote({
        length: '32n',
        octave: 3,
        pitch: 0,
        time: 0,
      }),
      createNote({
        length: '32n',
        octave: 3,
        pitch: 2,
        time: 2,
      }),
      createNote({
        length: '32n',
        octave: 3,
        pitch: 4,
        time: 4,
      }),
      createNote({
        length: '32n',
        octave: 3,
        pitch: 7,
        time: 6,
      }),
    ],
  });
}

function getInitialState() {
  return {
    measureCount: 1,
    notes: [],
    selectedNotes: [],
    scale: getScale(),
    synthType: defaultSynthType,
    toolType: defaultToolType,
  };
}
