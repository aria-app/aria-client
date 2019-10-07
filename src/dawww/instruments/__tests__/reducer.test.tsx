import test from 'ava';
import * as actions from '../../actions';
import reducer from '../reducer';

test('should return state with new instrument, with same id as track, merged in when action.type === TRACK_ADDED', t => {
  const expected = {
    a: { id: 'a' },
    b: { id: 'b' },
  };
  const result = reducer(
    {
      a: { id: 'a' },
    },
    {
      type: actions.TRACK_ADDED,
      payload: {
        track: {
          id: 'b',
          otherKey: [],
        },
      },
    },
    {
      toneAdapter: {
        createInstrument: args => ({ id: args.track.id }),
      },
    },
  );
  t.deepEqual(result, expected);
});

test('should return state without instrument with same id as track merged in when action.type === TRACK_DELETION_ACCEPTED', t => {
  const expected = {
    a: { id: 'a' },
  };
  const result = reducer(
    {
      a: { id: 'a' },
      b: { id: 'b' },
    },
    {
      type: actions.TRACK_DELETION_ACCEPTED,
      payload: {
        track: {
          id: 'b',
          otherKey: [],
        },
      },
    },
  );
  t.deepEqual(result, expected);
});

test('should return state when action.type is not handled', t => {
  const expected = {
    a: { id: 'a' },
  };
  const result = reducer(
    {
      a: { id: 'a' },
    },
    {
      type: actions.UNKNOWN,
    },
    {},
  );
  t.deepEqual(result, expected);
});
