import { CurriedFunction2 } from 'lodash/function';

import { Note, PlaybackState, Point, Sequence, Track } from '../types';

export interface DawwwAction {
  payload?: any;
  type: string;
}

export interface DawwwContext {
  dispatch: Dispatch;
  helpers: {
    addPoints: CurriedFunction2<Point, Point, Point>;
    getLetterFromPitch: (pitch: number) => PitchLetter;
    getNoteLength: (note: Note, toneAdapter: ToneAdapter) => number;
    getNotesInArea: (start: Point, end: Point, notes: Note[]) => Note[];
    getPitchName: (pitch: number) => PitchName;
    getPointOffset: (start: Point, end: Point) => Point;
    measuresToTime: (
      measureCount: number,
      toneAdapter: ToneAdapter,
    ) => ToneTime;
    setAtIds: SetAtIds;
    sizeToTime: (size: number, toneAdapter: ToneAdapter) => ToneTime;
    someNoteWillMoveOutside: (
      measureCount: number,
      delta: Point,
      notes: Note[],
    ) => boolean;
    translateNote: CurriedFunction2<Point, Note, Note>;
  };
  models: {
    part: {
      disableLooping: (part: Part) => void;
      dispose: (part: Part) => void;
      mapEvents: (
        iteratee: (event: any, index: number) => any,
        part: Part,
      ) => void;
      startAtOffset: (offsetTime: ToneTime, part: Part) => void;
      startAtTime: (startTime: ToneTime, part: Part) => void;
      stop: (part: Part) => void;
    };
    volumeNode: {
      mute: (volumeNode: any) => void;
      setVolume: (volumeNode: any, volume: number) => void;
      unmute: (volumeNode: any) => void;
    };
  };
  selectors: {
    getIsAnyTrackSoloing: (state: State) => boolean;
    getLoopEndPoint: (state: State) => number;
    getLoopStartPoint: (state: State) => number;
  };
  toneAdapter: ToneAdapter;
}

export type DawwwEffects = (
  getState: () => State,
  action: DawwwAction,
  shared: DawwwContext,
) => void;

export type DawwwReducer<T = State> = (
  state: T,
  action: DawwwAction,
  shared: DawwwContext,
) => any;

export type Dispatch<T = any> = (payload: T) => void;

export type ObjectWithId = {
  [key in number | string]: any;
} & {
  id: number | string;
};

export type Part = Record<number | string, any>;

export type PitchLetter =
  | 'B'
  | 'A#'
  | 'A'
  | 'G#'
  | 'G'
  | 'F#'
  | 'F'
  | 'E'
  | 'D#'
  | 'D'
  | 'C#'
  | 'C';

export type PitchName = string;

export type SetAtIds<T extends ObjectWithId = ObjectWithId> = (
  array: T[],
  obj: Record<number | string, T>,
) => Record<number | string, T>;

export interface State {
  instruments: any;
  parts: any;
  playbackState: PlaybackState;
  position: number;
  song: {
    focusedSequenceId?: number;
    notes: Record<number, Note>;
    sequences: Record<number, Sequence>;
    tracks: Record<number, Track>;
  };
  transportPart: Record<string, any>;
  volumeNodes: Record<string, any>;
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

export type ToneTime = number;
