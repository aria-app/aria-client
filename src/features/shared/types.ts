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

export interface IPoint {
  x: number;
  y: number;
}

export interface INote {
  id: string;
  points: Array<IPoint>;
  sequenceId: string;
}

export interface ISequence {
  id: string;
  measureCount: number;
  position: number;
  trackId: string;
}

export interface ISequenceWithNotes extends ISequence {
  notes: Array<INote>;
}

export interface ITrack {
  id: string;
  isMuted: boolean;
  isSoloing: boolean;
  voice: InstrumentType;
  volume: number;
}

export interface ITrackWithSequences extends ITrack {
  sequences: Array<ISequenceWithNotes>;
}

export interface ISong {
  bpm: number;
  dateModified: Date;
  id: string;
  measureCount: number;
  name: string;
  notes: { [key: string]: INote };
  sequences: { [key: string]: ISequence };
  tracks: { [key: string]: ITrack };
  userId: string;
}

export type IUser = firebase.User;
