import * as firebase from 'firebase/app';

export type InstrumentType =
  | 'FATSAWTOOTH'
  | 'FATSINE'
  | 'FATSQUARE'
  | 'FATTRIANGLE'
  | 'PULSE'
  | 'PWM'
  | 'SAWTOOTH'
  | 'SINE'
  | 'SQUARE'
  | 'TRIANGLE';

export interface Point {
  x: number;
  y: number;
}

export interface Note {
  id: string;
  points: Array<Point>;
  sequenceId: string;
}

export interface Sequence {
  id: string;
  measureCount: number;
  position: number;
  trackId: string;
}

export interface ISequenceWithNotes extends Sequence {
  notes: Array<Note>;
}

export interface Track {
  id: string;
  isMuted: boolean;
  isSoloing: boolean;
  voice: InstrumentType;
  volume: number;
}

export interface ITrackWithSequences extends Track {
  sequences: Array<ISequenceWithNotes>;
}

export interface Song {
  bpm: number;
  dateModified: number;
  id: string;
  measureCount: number;
  name: string;
  notes: { [key: string]: Note };
  sequences: { [key: string]: Sequence };
  tracks: { [key: string]: Track };
  userId: string;
}

export type User = firebase.User;
