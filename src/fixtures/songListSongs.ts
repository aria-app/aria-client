import { uniqueId } from 'lodash';

import { SongListSong } from '../types';

export const songListSongs: SongListSong[] = [
  {
    __typename: 'Song',
    id: parseInt(uniqueId()),
    name: 'Song 1',
    updatedAt: '2021-01-01T00:00:00Z',
  },
  {
    __typename: 'Song',
    id: parseInt(uniqueId()),
    name: 'Song 2',
    updatedAt: '2021-04-02T00:00:00Z',
  },
];
