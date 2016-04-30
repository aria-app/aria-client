import _ from 'lodash';
import actionTypes from './actionTypes';
import sound from 'modules/sound';
import { defaultSynthType, defaultToolType } from './constants';

const { getScale } = sound.helpers;

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
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

function getInitialState() {
  return {
    id: 0,
    measureCount: 1,
    scale: getScale(),
    synthType: defaultSynthType,
    toolType: defaultToolType,
  };
}
