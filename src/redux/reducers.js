import _ from 'lodash';
import Tone from 'tone';
import actions from './actions';

const initialState = {
  measureCount: 1,
  notes: [],
  synth: getSynth('square'),
};

export function app(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_NOTE:
      return _.assign({}, state, {
        notes: state.notes.concat(action.note),
      });
    case actions.REMOVE_NOTE:
      return _.assign({}, state, {
        notes: _.without(state.notes, action.note),
      });
    case actions.SET_MEASURE_COUNT:
      return _.assign({}, state, {
        measureCount: action.measureCount,
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
