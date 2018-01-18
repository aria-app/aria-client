import defaultTo from 'lodash/fp/defaultTo';
import get from 'lodash/fp/get';
import pipe from 'lodash/fp/pipe';
import song from '../song';
import { NAME } from './constants';

export const getSelectedSequenceId = pipe(
  get(NAME),
  get('selectedSequenceId'),
  defaultTo(''),
);

export const getStagedTrackId = pipe(
  get(NAME),
  get('stagedTrackId'),
  defaultTo(''),
);

export const getSelectedSequence = state =>
  song.selectors.getSequenceById(getSelectedSequenceId(state))(state) || {};

export const getStagedTrack = (state) => {
  const id = getStagedTrackId(state);
  const track = song.selectors.getTrackById(id)(state);
  return track || {};
};
