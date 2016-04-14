import _ from 'lodash';
import Tone from 'tone';
import actions from './actions';

const initialState = {
  measureCount: 1,
  notes: [],
  selectedNotes: [],
  position: 0,
  synth: getSynth('square'),
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

export function app(state = initialStateWithNotes, action) {
  switch (action.type) {
    case actions.ADD_NOTE:
      return _.assign({}, state, {
        notes: state.notes.concat(action.note),
      });
    case actions.DELETE_NOTES:
      return _.assign({}, state, {
        notes: _.difference(state.notes, action.notes),
        selectedNotes: [],
      });
    case actions.SELECT_NOTES:
      return _.assign({}, state, {
        selectedNotes: action.notes,
      });
    case actions.SET_MEASURE_COUNT:
      return _.assign({}, state, {
        measureCount: action.measureCount,
      });
    case actions.SET_POSITION:
      return _.assign({}, state, {
        position: action.position,
      });
    case actions.SET_SYNTH:
      return _.assign({}, state, {
        synth: getSynth(action.synthType),
      });
    default:
      return state;
  }
}

function getSynth(type) {
  return new Tone.PolySynth(4, Tone.SimpleSynth, {
    oscillator: { type },
    volume: -20,
  }).toMaster();
}
