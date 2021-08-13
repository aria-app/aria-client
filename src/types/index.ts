export type AudioManagerType = any;

export interface Note {
  __typename: string;
  id: number;
  points: Point[];
  sequence: Pick<Sequence, '__typename' | 'id'>;
}

export interface PaginatedResponse<TData, TTypename> {
  __typename: TTypename;
  data: TData[];
  meta: PaginationMetadata;
}

export interface PaginationMetadata {
  __typename: string;
  currentPage: number;
  itemsPerPage: number;
  totalItemCount: number;
}

export type PlaybackState = 'PAUSED' | 'STARTED' | 'STOPPED';

export type Point = {
  x: number;
  y: number;
};

export interface Sequence {
  __typename: string;
  id: number;
  measureCount: number;
  notes: Note[];
  position: number;
  track: Pick<Track, '__typename' | 'id'>;
}

export interface Song {
  __typename: string;
  bpm: number;
  createdAt: string;
  id: number;
  measureCount: number;
  name: string;
  tracks: Track[];
  updatedAt: string;
  user: Pick<User, '__typename' | 'id'>;
}

export type SongListSong = Pick<
  Song,
  '__typename' | 'id' | 'name' | 'updatedAt'
>;

export interface Track {
  __typename: string;
  id: number;
  isMuted: boolean;
  isSoloing: boolean;
  position: number;
  sequences: Sequence[];
  song: Pick<Song, '__typename' | 'id'>;
  voice: Voice;
  volume: number;
}

export interface User {
  __typename: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  songs: Song[];
}

export interface Voice {
  __typename: string;
  id: number;
  name: string;
  toneOscillatorType: string;
}
