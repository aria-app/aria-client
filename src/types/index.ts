export interface Note {
  id: number;
  points: Point[];
  sequenceId: number | null;
}

export type Point = {
  x: number;
  y: number;
};

export interface Sequence {
  id: number;
  measureCount: number;
  notes: Note[];
  position: number;
  track: Track;
}

export interface Song {
  bpm: number;
  createdAt: Date;
  id: number;
  measureCount: number;
  name: string;
  tracks: Track[];
  updatedAt: Date;
  user: User;
}

export interface Track {
  id: number;
  isMuted: boolean;
  isSoloing: boolean;
  position: number;
  sequences: Sequence[];
  song: Song;
  voice: Voice;
  volume: number;
}

export interface User {
  createdAt: Date;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  songs: Song[];
}

export interface Voice {
  id: number;
  name: string;
  toneOscillatorType: string;
}
