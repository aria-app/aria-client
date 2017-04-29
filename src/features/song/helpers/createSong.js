import { map } from 'lodash/fp';
import { v4 } from 'uuid';
import shared from '../../shared';
import { createNote } from './createNote';
import { createSequence } from './createSequence';
import { createTrack } from './createTrack';

const initialTracks = [
  createTrack(),
];

const initialSequences = [
  createSequence({
    trackId: initialTracks[0].id,
    position: 0,
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
    bpm: shared.constants.defaultBPM,
    id: v4(),
    measureCount: shared.constants.defaultMeasureCount,
    name: shared.constants.defaultSongName,
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
