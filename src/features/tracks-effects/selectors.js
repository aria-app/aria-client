import song from '../song';
import tracksData from '../tracks-data';

export const getSelectedSequence = state =>
  song.selectors.getSequenceById(tracksData.selectors.getSelectedSequenceId(state))(state) || {};

export const getStagedTrack = (state) => {
  const id = tracksData.selectors.getStagedTrackId(state);
  const track = song.selectors.getTrackById(id)(state);
  return track || {};
};
