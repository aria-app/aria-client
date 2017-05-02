import find from 'lodash/fp/find';
import reject from 'lodash/fp/reject';
import state from '../state';
import createSequence from './createSequence';

export default {
  delete: (options) => {
    state.sequences = reject({ id: options.id }, state.sequences);
  },

  post: (options) => {
    state.sequences = [
      ...state.sequences,
      createSequence(options),
    ];
  },

  update: (options) => {
    const oldSequence = find({ id: options.id }, state.sequences);
    oldSequence.part.dispose();
    state.sequences = [
      ...reject({ id: options.id }, state.sequences),
      createSequence(options),
    ];
  },
};
