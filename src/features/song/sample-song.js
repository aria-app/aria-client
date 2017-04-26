import { map } from 'lodash/fp';
import { v4 } from 'uuid';
import shared from '../shared';
import * as helpers from './helpers';

const { synthTypes } = shared.constants;

const initialTracks = [
  helpers.createTrack(synthTypes.SQUARE),
  // helpers.createTrack(synthTypes.SAWTOOTH),
  // helpers.createTrack(synthTypes.PWM),
];

const initialSequences = [
  helpers.createSequence({
    trackId: initialTracks[0].id,
    measureCount: 1,
    position: 0,
  }),
  // helpers.createSequence({
  //   trackId: initialTracks[1].id,
  //   measureCount: 1,
  //   position: 0,
  // }),
  // helpers.createSequence({
  //   trackId: initialTracks[2].id,
  //   measureCount: 1,
  //   position: 0,
  // }),
];

const initialNotes = [
  helpers.createNote({
    sequenceId: initialSequences[0].id,
    points: [
      { x: 2, y: 40 },
      { x: 3, y: 40 },
    ],
  }),
];

export default {
  activeSequenceId: '',
  bpm: 150,
  id: v4(),
  measureCount: 4,
  name: 'My Song',
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
