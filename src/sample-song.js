import _ from 'lodash';
import { v4 } from 'node-uuid';
import shared from 'ducks/shared';
import song from 'ducks/song';

const { synthTypes } = shared.constants;

const initialTracks = [
  song.helpers.createTrack(synthTypes.SQUARE),
  song.helpers.createTrack(synthTypes.SAWTOOTH),
  song.helpers.createTrack(synthTypes.PWM),
];

const initialSequences = [
  song.helpers.createSequence({
    trackId: initialTracks[0].id,
    measureCount: 1,
    position: 0,
  }),
  song.helpers.createSequence({
    trackId: initialTracks[1].id,
    measureCount: 2,
    position: 0,
  }),
  song.helpers.createSequence({
    trackId: initialTracks[2].id,
    measureCount: 1,
    position: 0,
  }),
  song.helpers.createSequence({
    trackId: initialTracks[0].id,
    measureCount: 1,
    position: 1,
  }),
];

const initialNotes = [
  song.helpers.createNote({
    sequenceId: initialSequences[0].id,
    points: [
      { x: 0, y: 35 },
      { x: 1, y: 35 },
    ],
  }),
  song.helpers.createNote({
    sequenceId: initialSequences[0].id,
    points: [
      { x: 0, y: 40 },
      { x: 1, y: 40 },
    ],
  }),
];

export default {
  bpm: 150,
  id: v4(),
  measureCount: 4,
  name: 'My Song',
  notes: {
    dict: initialNotes.reduce((acc, cur) =>
      ({ ...acc, [cur.id]: cur }),
      {}
    ),
    ids: _.map(initialNotes, 'id'),
  },
  sequences: {
    dict: initialSequences.reduce((acc, cur) =>
      ({ ...acc, [cur.id]: cur }),
      {}
    ),
    ids: _.map(initialSequences, 'id'),
  },
  tracks: {
    dict: initialTracks.reduce((acc, cur) =>
      ({ ...acc, [cur.id]: cur }),
      {}
    ),
    ids: _.map(initialTracks, 'id'),
  },
};
