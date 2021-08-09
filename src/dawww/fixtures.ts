import { Song } from '../types';
import { DawwwSong } from './types';

export const basicSong: Song = {
  __typename: 'Song',
  bpm: 120,
  createdAt: '2021-01-01',
  id: 1,
  measureCount: 4,
  name: 'testName',
  tracks: [
    {
      __typename: 'Track',
      id: 1,
      isMuted: false,
      isSoloing: false,
      position: 0,
      sequences: [
        {
          __typename: 'Sequence',
          id: 1,
          measureCount: 4,
          notes: [
            {
              __typename: 'Note',
              id: 1,
              points: [
                {
                  x: 0,
                  y: 0,
                },
                {
                  x: 3,
                  y: 0,
                },
              ],
              sequence: {
                __typename: 'Sequence',
                id: 1,
              },
            },
          ],
          position: 0,
          track: {
            __typename: 'Track',
            id: 1,
          },
        },
      ],
      song: {
        __typename: 'Song',
        id: 1,
      },
      voice: {
        __typename: 'Voice',
        id: 1,
        name: 'testVoice',
        toneOscillatorType: 'testToneOscillatorType',
      },
      volume: 1,
    },
  ],
  updatedAt: '2021-01-01',
  user: {
    __typename: 'User',
    id: 1,
  },
};

export const basicDawwwSong: DawwwSong = {
  bpm: 120,
  focusedSequenceId: null,
  id: 1,
  measureCount: 4,
  notes: {
    1: {
      id: 1,
      points: [
        { x: 0, y: 0 },
        { x: 3, y: 0 },
      ],
      sequenceId: 1,
    },
  },
  sequences: {
    1: {
      id: 1,
      measureCount: 4,
      position: 0,
      trackId: 1,
    },
  },
  tracks: {
    1: {
      id: 1,
      isMuted: false,
      isSoloing: false,
      voice: 'testToneOscillatorType',
      volume: 1,
    },
  },
};
