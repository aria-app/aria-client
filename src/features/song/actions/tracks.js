import { NAME } from '../constants';

export const TRACK_CREATED_AND_ADDED = `${NAME}/TRACK_CREATED_AND_ADDED`;
export const TRACK_DELETED = `${NAME}/TRACK_DELETED`;
export const TRACK_IS_MUTED_TOGGLED = `${NAME}/TRACK_IS_MUTED_TOGGLED`;
export const TRACK_IS_SOLOING_TOGGLED = `${NAME}/TRACK_IS_SOLOING_TOGGLED`;
export const TRACK_SYNTH_TYPE_SET = `${NAME}/TRACK_SYNTH_TYPE_SET`;
export const TRACKS_ADDED = `${NAME}/TRACKS_ADDED`;
export const TRACKS_DELETED = `${NAME}/TRACKS_DELETED`;
export const TRACKS_SET = `${NAME}/TRACKS_SET`;
export const TRACKS_UPDATED = `${NAME}/TRACKS_UPDATED`;

export const trackCreatedAndAdded = () => ({
  type: TRACK_CREATED_AND_ADDED,
});

export const trackDeleted = id => ({
  type: TRACK_DELETED,
  id,
});

export const trackIsMutedToggled = id => ({
  type: TRACK_IS_MUTED_TOGGLED,
  id,
});

export const trackIsSoloingToggled = id => ({
  type: TRACK_IS_SOLOING_TOGGLED,
  id,
});

export const trackSynthTypeSet = (id, synthType) => ({
  type: TRACK_SYNTH_TYPE_SET,
  synthType,
  id,
});

export const tracksAdded = tracks => ({
  type: TRACKS_ADDED,
  tracks,
});

export const tracksDeleted = ids => ({
  type: TRACKS_DELETED,
  ids,
});

export const tracksSet = tracks => ({
  type: TRACKS_SET,
  tracks,
});

export const tracksUpdated = tracks => ({
  type: TRACKS_UPDATED,
  tracks,
});
