import { PlaybackState } from '../types';

export interface DawwwAction {
  payload?: any;
  type: string;
}

export interface DawwwContext {
  toneAdapter: ToneAdapter;
}

export type DawwwReducer<T = StateRoot> = (
  state: T,
  action: DawwwAction,
  shared: DawwwContext,
) => any;

export interface StateRoot {
  instruments: any;
  parts: any;
  playbackState: PlaybackState;
  position: number;
  song: {
    notes: any;
    sequences: any;
    tracks: any;
  };
  transportPart: any;
  volumeNodes: StateVolumeNodes;
}

export interface Step {
  fn: () => void;
  payload: any;
}

export interface ToneAdapter {
  chainToMaster: (source: any, ...rest: any[]) => void;
  createInstrument: (options: any) => any;
  createSequence: (options: any) => any;
  createVolume: (options: any) => any;
  onSequenceStep: (time: string, step: Step) => any;
  pause: () => void;
  setBPM: (value: any[]) => void;
  setLoopPoints: (...args: any[]) => void;
  setTransportPosition: (position: number) => void;
  start: (...args: any[]) => void;
  stop: () => void;
  Time: (...args: any[]) => void;
}

export type StateVolumeNodes = Record<string, any>;
