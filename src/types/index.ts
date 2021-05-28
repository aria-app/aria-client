export interface Note {
  __typename?: string;
  id: number;
  points: Point[];
  sequence: Partial<Sequence> & { id: number };
}

export default interface PaginatedResponse<T> {
  __typename?: string;
  data: T[];
  meta: PaginatedResponseMetadata;
}

export interface PaginatedResponseMetadata {
  __typename?: string;
  currentPage: number;
  itemsPerPage: number;
  totalItemCount: number;
}

export type PlaybackState = 'PAUSED' | 'STARTED' | 'STOPPED';

export type Point = {
  x: number;
  y: number;
};

export interface ScaleStep {
  name: string;
  y: number;
}

export interface Sequence {
  __typename?: string;
  id: number;
  measureCount: number;
  notes: Note[];
  position: number;
  track: Partial<Track> & { id: number };
}

export interface Song {
  __typename?: string;
  bpm: number;
  createdAt: string;
  id: number;
  measureCount: number;
  name: string;
  tracks: Track[];
  updatedAt: string;
  user: Partial<User> & { id: number };
}

export interface Track {
  __typename?: string;
  id: number;
  isMuted: boolean;
  isSoloing: boolean;
  position: number;
  sequences: Sequence[];
  song: Partial<Song> & { id: number };
  voice: Voice;
  volume: number;
}

export interface User {
  __typename?: string;
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  songs: Song[];
}

export interface Voice {
  __typename?: string;
  id: number;
  name: string;
  toneOscillatorType: string;
}
