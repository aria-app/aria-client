import _ from 'lodash';
import actionTypes from './actionTypes';
import sound from 'sound';
import { toolTypes } from './constants';

const { synthTypes } = sound.constants;
const { createSynth } = sound.model;

const initialState = {
  measureCount: 1,
  notes: [],
  selectedNotes: [],
  position: 0,
  synth: createSynth(synthTypes.SAWTOOTH),
  tool: toolTypes.DRAW,
};

const initialStateWithNotes = _.assign({}, initialState, {
  notes: [
    {
      frequency: 130.8,
      length: '32n',
      octave: 3,
      pitch: 0,
      time: 0,
    },
    {
      frequency: 146.8,
      length: '32n',
      octave: 3,
      pitch: 2,
      time: 2,
    },
    {
      frequency: 164.8,
      length: '32n',
      octave: 3,
      pitch: 4,
      time: 4,
    },
    {
      frequency: 196,
      length: '32n',
      octave: 3,
      pitch: 7,
      time: 6,
    },
  ],
});

export default function reducer(state = initialStateWithNotes, action) {
  switch (action.type) {
    case actionTypes.DELETE_NOTES:
      return _.assign({}, state, {
        notes: _.difference(state.notes, action.notes),
        selectedNotes: [],
      });
    case actionTypes.DRAW_NOTE:
      return _.assign({}, state, {
        notes: state.notes.concat(action.note),
      });
    case actionTypes.SELECT_NOTES:
      return _.assign({}, state, {
        selectedNotes: action.notes,
      });
    case actionTypes.SET_MEASURE_COUNT:
      return _.assign({}, state, {
        measureCount: action.measureCount,
      });
    case actionTypes.SET_POSITION:
      return _.assign({}, state, {
        position: action.position,
      });
    case actionTypes.SET_SYNTH:
      return _.assign({}, state, {
        synth: createSynth(action.synthType),
      });
    case actionTypes.SET_TOOL:
      return _.assign({}, state, {
        tool: action.tool,
      });
    default:
      return state;
  }
}
