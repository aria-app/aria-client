import { map } from 'lodash/fp';
import shortid from 'shortid';
import * as constants from '../constants';
import { createNote } from './createNote';
import { createSequence } from './createSequence';
import { createTrack } from './createTrack';

const initialTracks = [
  createTrack(),
];

const initialSequences = [
  createSequence({
    trackId: initialTracks[0].id,
  }),
];

const initialNotes = [
  createNote({
    sequenceId: initialSequences[0].id,
    points: [
      { x: 2, y: 40 },
      { x: 3, y: 40 },
    ],
  }),
];

export function createSong() {
  return {
    activeSequenceId: '',
    bpm: constants.defaultBPM,
    id: shortid.generate(),
    measureCount: constants.defaultMeasureCount,
    name: constants.defaultSongName,
    notes: {
      dict: initialNotes.reduce((acc, cur) =>
        ({ ...acc, [cur.id]: cur }),
        {},
      ),
      ids: map('id')(initialNotes),
    },
    sequences: {
      dict: initialSequences.reduce((acc, cur) =>
        ({ ...acc, [cur.id]: cur }),
        {},
      ),
      ids: map('id')(initialSequences),
    },
    tracks: {
      dict: initialTracks.reduce((acc, cur) =>
        ({ ...acc, [cur.id]: cur }),
        {},
      ),
      ids: map('id')(initialTracks),
    },
  };
}
