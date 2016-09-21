import * as actions from './actions';
import * as constants from './constants';
import reducer from './reducer';

describe('Transport Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      playbackState: constants.playbackStates.STOPPED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle PLAYBACK_PAUSED', () => {
    const previous = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const expected = {
      playbackState: constants.playbackStates.PAUSED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const action = {
      type: t.PLAYBACK_PAUSED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle PLAYBACK_STARTED', () => {
    const previous = {
      playbackState: constants.playbackStates.STOPPED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const expected = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const action = {
      type: t.PLAYBACK_STARTED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle PLAYBACK_STOPPED', () => {
    const previous = {
      playbackState: constants.playbackStates.STARTED,
      position: 40,
      sequences: [],
      songPosition: 80,
      songSequence: {},
      startPoint: '0',
    };
    const expected = {
      playbackState: constants.playbackStates.STOPPED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const action = {
      type: t.PLAYBACK_STOPPED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle PLAYBACK_TOGGLED when paused', () => {
    const previous = {
      playbackState: constants.playbackStates.PAUSED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const expected = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const action = {
      type: t.PLAYBACK_TOGGLED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle PLAYBACK_TOGGLED when stopped', () => {
    const previous = {
      playbackState: constants.playbackStates.STOPPED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const expected = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const action = {
      type: t.PLAYBACK_TOGGLED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle PLAYBACK_TOGGLED when started', () => {
    const previous = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const expected = {
      playbackState: constants.playbackStates.PAUSED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const action = {
      type: t.PLAYBACK_TOGGLED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle POSITION_SET', () => {
    const previous = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const expected = {
      playbackState: constants.playbackStates.STARTED,
      position: 40,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const action = {
      type: t.POSITION_SET,
      position: 40,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCES_SET', () => {
    const previous = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const expected = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [{ id: 's1' }],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const action = {
      type: t.SEQUENCES_SET,
      sequences: [{ id: 's1' }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_POSITION_SET', () => {
    const previous = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const expected = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 80,
      songSequence: {},
      startPoint: '0',
    };
    const action = {
      type: t.SONG_POSITION_SET,
      position: 80,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_SEQUENCE_SET', () => {
    const previous = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const expected = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: { id: 's1' },
      startPoint: '0',
    };
    const action = {
      type: t.SONG_SEQUENCE_SET,
      sequence: { id: 's1' },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle START_POINT_SET', () => {
    const previous = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0',
    };
    const expected = {
      playbackState: constants.playbackStates.STARTED,
      position: 0,
      sequences: [],
      songPosition: 0,
      songSequence: {},
      startPoint: '0:0:4',
    };
    const action = {
      type: t.START_POINT_SET,
      startPoint: '0:0:4',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
