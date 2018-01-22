import shortid from 'shortid';
import * as constants from '../constants';
import { createNote } from './createNote';
import { createSequence } from './createSequence';
import { createTrack } from './createTrack';

const initialTracks = [
  createTrack(),
];

const initialSequences = [
  createSequence(initialTracks[0].id),
];

const initialNotes = [
  createNote(
    initialSequences[0].id,
    [
      { x: 2, y: 40 },
      { x: 3, y: 40 },
    ],
  ),
];

export function createSong() {
  return {
    bpm: constants.defaultBPM,
    id: shortid.generate(),
    measureCount: constants.defaultMeasureCount,
    name: constants.defaultSongName,
    notes: initialNotes.reduce((acc, cur) =>
      ({ ...acc, [cur.id]: cur }),
    {},
    ),
    sequences: initialSequences.reduce((acc, cur) =>
      ({ ...acc, [cur.id]: cur }),
    {},
    ),
    tracks: initialTracks.reduce((acc, cur) =>
      ({ ...acc, [cur.id]: cur }),
    {},
    ),
  };
}
