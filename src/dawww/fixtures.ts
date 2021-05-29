import { Song } from '../types';
import { DawwwSong } from './types';

export const basicSong: Song = {
  bpm: 120,
  createdAt: '2021-01-01',
  id: 1,
  measureCount: 4,
  name: 'testName',
  tracks: [
    {
      id: 1,
      isMuted: false,
      isSoloing: false,
      position: 0,
      sequences: [
        {
          id: 1,
          measureCount: 4,
          notes: [
            {
              id: 1,
              points: [
                { x: 0, y: 0 },
                { x: 3, y: 0 },
              ],
              sequence: {
                id: 1,
              },
            },
          ],
          position: 0,
          track: {
            id: 1,
          },
        },
      ],
      song: {
        id: 1,
      },
      voice: {
        id: 1,
        name: 'testVoice',
        toneOscillatorType: 'testToneOscillatorType',
      },
      volume: 1,
    },
  ],
  updatedAt: '2021-01-01',
  user: {
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
