import _ from 'lodash';
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
];

function getInitialState() {
  return {
    song: {
      bpm: 150,
      id: v4(),
      measureCount: 1,
      name: 'My Song',
    },
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
}

export default getInitialState();
