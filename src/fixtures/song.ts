import { Song } from '../types';
import { user } from './user';
import { voices } from './voices';

export const song: Song = {
  __typename: 'Song',
  bpm: 100,
  createdAt: '2021-01-01T00:00:00Z',
  id: 100,
  measureCount: 4,
  name: 'Song 1',
  tracks: [
    {
      __typename: 'Track',
      id: 100,
      isMuted: false,
      isSoloing: false,
      position: 1,
      sequences: [
        {
          __typename: 'Sequence',
          id: 100,
          measureCount: 1,
          notes: [
            {
              __typename: 'Note',
              id: 100,
              points: [
                { x: 0, y: 34 },
                { x: 1, y: 34 },
              ],
              sequence: {
                __typename: 'Sequence',
                id: 100,
              },
            },
          ],
          position: 0,
          track: {
            __typename: 'Track',
            id: 100,
          },
        },
      ],
      song: {
        __typename: 'Song',
        id: 100,
      },
      voice: voices[0],
      volume: 1,
    },
  ],
  updatedAt: '2021-01-01T00:00:00Z',
  user: user,
};
