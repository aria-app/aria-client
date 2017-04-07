import sequenceData from '../../../sequence-data';
import * as actions from '../../actions';
import { activeSequenceId as reducer } from '../active-sequence-id';

describe('Song activeSequenceId reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = '';
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_CLOSED', () => {
    const previous = 'sequence-1';
    const expected = '';
    const action = {
      type: sequenceData.actions.SEQUENCE_CLOSED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_OPENED', () => {
    const previous = '';
    const expected = 'sequence-1';
    const action = {
      type: actions.SEQUENCE_OPENED,
      id: 'sequence-1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_LOADED', () => {
    const previous = '';
    const expected = 'my-sequence';
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
});
