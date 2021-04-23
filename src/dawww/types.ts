import { Note, Sequence, Track } from '../types';

export type ActionEffect<T> = (
  getState: () => State,
  action: T,
  shared: SharedContext,
) => void;

export type Instrument = any;

export type Part = any;

export type PlaybackState = 'PAUSED' | 'STOPPED' | 'STARTED';

export type SharedContext = any;

export interface State {
  instruments: Record<string, Instrument>;
  parts: Record<string, Part>;
  playbackState: PlaybackState;
  position: number;
  song: {
    focusedSequenceId: number | null;
    notes: Record<number, Note>;
    sequences: Record<number, Sequence>;
    tracks: Record<number, Track>;
  };
  transportPart: Record<string, TransportPart>;
  volumeNodes: Record<string, VolumeNode>;
}

export type TransportPart = any;

export type VolumeNode = any;
