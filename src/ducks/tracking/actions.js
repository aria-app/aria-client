import * as actionTypes from './action-types';

export function setSelectedSequenceIds(selectedSequenceIds) {
  console.log(selectedSequenceIds);
  return {
    type: actionTypes.SET_SELECTED_SEQUENCE_IDS,
    selectedSequenceIds,
  };
}
