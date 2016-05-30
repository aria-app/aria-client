import * as actionTypes from './action-types';

export function setSelectedSequenceId(selectedSequenceId) {
  return {
    type: actionTypes.SET_SELECTED_SEQUENCE_ID,
    selectedSequenceId,
  };
}
