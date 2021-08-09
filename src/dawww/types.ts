import { Diff } from 'deep-diff';
import { CurriedFunction2 } from 'lodash/function';
import { TimeClass } from 'tone';
import { TimeBaseUnit, TimeValue } from 'tone/build/esm/core/type/TimeBase';
import { Time, TransportTime } from 'tone/build/esm/core/type/Units';

import { Note, PlaybackState, Point, Sequence, Track } from '../types';

export interface DawwwAction<T = any> {
  payload?: T;
  type: string;
}

export interface DawwwContext {
  dispatch: Dispatch;
  helpers: {
    addPoints: CurriedFunction2<Point, Point, Point>;
    getLetterFromPitch: (pitch: number) => PitchLetter;
    getNoteLength: (note: DawwwNote, toneAdapter: ToneAdapter) => number;
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
    instrument: {
      dispose: (instrument: Instrument) => void;
      playNote: (
        instrument: Instrument,
        name: string,
        length: ToneTime,
        time?: ToneTime,
      ) => void;
      setVoice: (instrument: Instrument, voice: string) => void;
    };
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
      dispose: (volumeNode: VolumeNode) => void;
      mute: (volumeNode: VolumeNode) => void;
      setVolume: (volumeNode: VolumeNode, volume: number) => void;
      unmute: (volumeNode: VolumeNode) => void;
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

export type DawwwReducer<TState = State> = (
  state: TState,
  action: DawwwAction,
  shared: DawwwContext,
) => any;

export interface DawwwNote
  extends Omit<Note, '__typename' | 'points' | 'sequence'> {
  points: DawwwPoint[];
  sequenceId: number;
}

export interface DawwwPoint {
  x: number;
  y: number;
}

export interface DawwwSequence
  extends Omit<Sequence, '__typename' | 'notes' | 'track'> {
  trackId: number;
}

export interface DawwwTrack
  extends Omit<
    Track,
    '__typename' | 'position' | 'sequences' | 'song' | 'voice'
  > {
  voice: string;
}

export interface DawwwSong {
  bpm: number;
  focusedSequenceId: number | null;
  id: number;
  measureCount: number;
  notes: Record<number, DawwwNote>;
  sequences: Record<number, DawwwSequence>;
  tracks: Record<number, DawwwTrack>;
}

export type DiffInterpreter<TDiff = Diff<any, any>> = (
  diff: TDiff,
  song?: DawwwSong,
) => DawwwAction;

export type Dispatch<T = any> = (payload: T) => void;

export type Instrument = {
  dispose: () => void;
  releaseAll: () => void;
  set: (options: {
    oscillator?: {
      type?: string;
    };
  }) => void;
  triggerAttackRelease: (
    name: string,
    length: ToneTime,
    time?: ToneTime,
  ) => void;
};

export interface ObjectWithId {
  id: number;
  [key: string]: any;
}

export type Part = Record<string, any>;

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
  obj: Record<number, T>,
) => Record<number, T>;

export interface State {
  instruments: Record<number, Instrument>;
  parts: Record<number, Part>;
  playbackState: PlaybackState;
  position: number;
  song: DawwwSong;
  transportPart: Record<string, TransportPart>;
  volumeNodes: Record<string, VolumeNode>;
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
  onSequenceStep: (time: number, step: Step) => any;
  pause: () => void;
  setBPM: (value: number) => void;
  setLoopPoints: (startPosition: Time, endPosition: Time) => void;
  setTransportPosition: (position: ToneTime) => void;
  start: (time?: Time, offset?: TransportTime) => void;
  stop: () => void;
  Time: (
    value?: TimeValue,
    units?: TimeBaseUnit,
  ) => TimeClass<number, TimeBaseUnit>;
}

export type ToneTime = number | string;

export type TransportPart = Record<string, any>;

export type VolumeNode = {
  dispose: () => void;
  mute: boolean;
  volume: {
    value: number;
  };
};
