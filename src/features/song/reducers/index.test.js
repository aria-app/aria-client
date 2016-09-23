import shared from '../../shared';
import * as actions from '../actions';
import { indexReducer as reducer } from './index';

describe('Song Index Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_CLOSED', () => {
    const previous = {
      activeSequenceId: 'sequence-1',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const expected = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const action = {
      type: actions.SEQUENCE_CLOSED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_OPENED', () => {
    const previous = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const expected = {
      activeSequenceId: 'sequence-1',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const action = {
      type: actions.SEQUENCE_OPENED,
      id: 'sequence-1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle BPM_SET', () => {
    const previous = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const expected = {
      activeSequenceId: '',
      bpm: 150,
      id: '',
      measureCount: 1,
      name: '',
    };
    const action = {
      type: actions.BPM_SET,
      bpm: 150,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should clamp bpm when set too low', () => {
    const previous = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const expected = {
      activeSequenceId: '',
      bpm: shared.constants.minBPM,
      id: '',
      measureCount: 1,
      name: '',
    };
    const action = {
      type: actions.BPM_SET,
      bpm: shared.constants.minBPM - 10,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should clamp bpm when set too high', () => {
    const previous = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const expected = {
      activeSequenceId: '',
      bpm: shared.constants.maxBPM,
      id: '',
      measureCount: 1,
      name: '',
    };
    const action = {
      type: actions.BPM_SET,
      bpm: shared.constants.maxBPM + 10,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_LOADED', () => {
    const previous = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const expected = {
      activeSequenceId: 'my-sequence',
      bpm: 150,
      id: 'song-1',
      measureCount: 3,
      name: 'my-song',
    };
    const action = {
      type: actions.SONG_LOADED,
      song: {
        activeSequenceId: 'my-sequence',
        bpm: 150,
        id: 'song-1',
        measureCount: 3,
        name: 'my-song',
      },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle ID_SET', () => {
    const previous = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const expected = {
      activeSequenceId: '',
      bpm: 120,
      id: 'song-1',
      measureCount: 1,
      name: '',
    };
    const action = {
      type: actions.ID_SET,
      id: 'song-1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle MEASURE_COUNT_SET', () => {
    const previous = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const expected = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 3,
      name: '',
    };
    const action = {
      type: actions.MEASURE_COUNT_SET,
      measureCount: 3,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_EXTENDED', () => {
    const previous = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const expected = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 2,
      name: '',
    };
    const action = {
      type: actions.SONG_EXTENDED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_SHORTENED', () => {
    const previous = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 2,
      name: '',
    };
    const expected = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const action = {
      type: actions.SONG_SHORTENED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NAME_SET', () => {
    const previous = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: '',
    };
    const expected = {
      activeSequenceId: '',
      bpm: 120,
      id: '',
      measureCount: 1,
      name: 'my-song',
    };
    const action = {
      type: actions.NAME_SET,
      name: 'my-song',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
