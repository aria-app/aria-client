import { v4 } from 'node-uuid';
import shared from 'ducks/shared';
import * as helpers from '../helpers';

const { synthTypes } = shared.constants;

const initialTracks = [
  helpers.createTrack(synthTypes.SQUARE),
  helpers.createTrack(synthTypes.SAWTOOTH),
  helpers.createTrack(synthTypes.PWM),
];

const initialSequences = [
  helpers.createSequence({
    trackId: initialTracks[0].id,
    measureCount: 1,
    position: 0,
  }),
  helpers.createSequence({
    trackId: initialTracks[1].id,
    measureCount: 2,
    position: 0,
  }),
  helpers.createSequence({
    trackId: initialTracks[2].id,
    measureCount: 1,
    position: 0,
  }),
  helpers.createSequence({
    trackId: initialTracks[0].id,
    measureCount: 1,
    position: 1,
  }),
];

const initialNotes = [
  helpers.createNote({
    sequenceId: initialSequences[0].id,
    points: [
      { x: 0, y: 35 },
      { x: 1, y: 35 },
    ],
  }),
  helpers.createNote({
    sequenceId: initialSequences[0].id,
    points: [
      { x: 0, y: 40 },
      { x: 1, y: 40 },
    ],
  }),
  helpers.createNote({
    sequenceId: initialSequences[0].id,
    points: [
      { x: 0, y: 47 },
      { x: 1, y: 47 },
    ],
  }),
];

function getInitialState() {
  return {
    song: {
      bpm: 120,
      id: v4(),
      measureCount: 2,
      name: 'My Song',
    },
    notes: {
      dict: {
        [initialNotes[0].id]: initialNotes[0],
        [initialNotes[1].id]: initialNotes[1],
        [initialNotes[2].id]: initialNotes[2],
      },
      ids: [
        initialNotes[0].id,
        initialNotes[1].id,
        initialNotes[2].id,
      ],
    },
    sequences: {
      dict: {
        [initialSequences[0].id]: initialSequences[0],
        [initialSequences[1].id]: initialSequences[1],
        [initialSequences[2].id]: initialSequences[2],
        [initialSequences[3].id]: initialSequences[3],
      },
      ids: [
        initialSequences[0].id,
        initialSequences[1].id,
        initialSequences[2].id,
        initialSequences[3].id,
      ],
    },
    tracks: {
      dict: {
        [initialTracks[0].id]: initialTracks[0],
        [initialTracks[1].id]: initialTracks[1],
        [initialTracks[2].id]: initialTracks[2],
      },
      ids: [
        initialTracks[0].id,
        initialTracks[1].id,
        initialTracks[2].id,
      ],
    },
  };
}

export default getInitialState();
