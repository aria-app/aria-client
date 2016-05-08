import _ from 'lodash';
import actionTypes from './action-types';
import * as helpers from './helpers';

export default function reducer(state = getInitialStateWithNotes(), action) {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        notes: [
          ...state.notes,
          ...action.notes,
        ],
      };
    case actionTypes.REMOVE:
      return {
        ...state,
        notes: _.difference(state.notes, action.notes),
        selectedNoteIds: [],
      };
    case actionTypes.SET_SELECTED_NOTE_IDS:
      return {
        ...state,
        selectedNoteIds: action.selectedNoteIds,
      };
    case actionTypes.UPDATE:
      return {
        ...state,
        notes: replaceItemsById(state.notes, action.notes),
      };
    default:
      return state;
  }
}

function getInitialStateWithNotes() {
  // const notesStr = '[{"id":"loadednote9","name":"C3","position":{"x":8,"y":47}},{"id":"loadednote10","name":"D3","position":{"x":10,"y":45}},{"id":"loadednote11","name":"E3","position":{"x":12,"y":43}},{"id":"loadednote12","name":"G3","position":{"x":14,"y":40}},{"id":"loadednote13","name":"C2","position":{"x":0,"y":59}},{"id":"loadednote14","name":"D2","position":{"x":2,"y":57}},{"id":"loadednote15","name":"E2","position":{"x":4,"y":55}},{"id":"loadednote16","name":"G2","position":{"x":6,"y":52}},{"id":"loadednote17","name":"C4","position":{"x":16,"y":35}},{"id":"loadednote18","name":"D4","position":{"x":18,"y":33}},{"id":"loadednote19","name":"E4","position":{"x":20,"y":31}},{"id":"loadednote20","name":"G4","position":{"x":22,"y":28}},{"id":"loadednote21","name":"C5","position":{"x":24,"y":23}},{"id":"loadednote22","name":"D5","position":{"x":26,"y":21}},{"id":"loadednote23","name":"E5","position":{"x":28,"y":19}},{"id":"loadednote24","name":"G5","position":{"x":30,"y":16}},{"id":"loadednote25","name":"C6","position":{"x":32,"y":11}},{"id":"loadednote26","name":"G5","position":{"x":34,"y":16}},{"id":"loadednote27","name":"E5","position":{"x":36,"y":19}},{"id":"loadednote28","name":"D5","position":{"x":38,"y":21}},{"id":"loadednote29","name":"C5","position":{"x":40,"y":23}},{"id":"loadednote30","name":"G4","position":{"x":42,"y":28}},{"id":"loadednote31","name":"E4","position":{"x":44,"y":31}},{"id":"loadednote32","name":"D4","position":{"x":46,"y":33}},{"id":"loadednote33","name":"C4","position":{"x":48,"y":35}},{"id":"loadednote35","name":"G3","position":{"x":50,"y":40}},{"id":"loadednote38","name":"E3","position":{"x":52,"y":43}},{"id":"loadednote39","name":"D3","position":{"x":54,"y":45}},{"id":"loadednote40","name":"C3","position":{"x":56,"y":47}},{"id":"loadednote41","name":"G2","position":{"x":58,"y":52}},{"id":"loadednote42","name":"E2","position":{"x":60,"y":55}},{"id":"loadednote43","name":"D2","position":{"x":62,"y":57}}]';
  // const notes = JSON.parse(notesStr);
  return {
    ...getInitialState(),
    // notes: [],
    notes: [
      helpers.createNote({
        length: 8,
        position: {
          x: 0,
          y: 47,
        },
      }),
    ],
    // notes,
  };
}

function getInitialState() {
  return {
    notes: [],
    selectedNoteIds: [],
  };
}

function replaceItemsById(list, items) {
  return list.map(i => {
    const newItem = _.find(items, { id: i.id });
    return newItem || i;
  });
}
