import test from 'ava';
import * as actions from '../../../actions';
import * as constants from '../../../constants';
import { interpretDiff } from '../interpretDiff';

test('should return interpreted action when diff is BPM_EDITED type', t => {
  const expected = {
    type: actions.BPM_EDITED,
    payload: {
      bpm: 200,
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    path: ['bpm'],
    rhs: 200,
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is FOCUSED_SEQUENCE_ID_EDITED type', t => {
  const expected = {
    type: actions.FOCUSED_SEQUENCE_ID_EDITED,
    payload: {
      focusedSequenceId: 'a',
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    path: ['focusedSequenceId'],
    rhs: 'a',
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is MEASURE_COUNT_EDITED type', t => {
  const expected = {
    type: actions.MEASURE_COUNT_EDITED,
    payload: {
      measureCount: 4,
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    path: ['measureCount'],
    rhs: 4,
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is NOTE_ADDED type', t => {
  const expected = {
    type: actions.NOTE_ADDED,
    payload: {
      id: 'a',
      note: { id: 'a' },
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_N,
    path: ['notes'],
    rhs: { id: 'a' },
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is NOTE_DELETED type', t => {
  const expected = {
    type: actions.NOTE_DELETED,
    payload: {
      id: 'a',
      note: { id: 'a' },
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_D,
    lhs: { id: 'a' },
    path: ['notes'],
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is NOTE_POINT_ADDED type', t => {
  const expected = {
    type: actions.NOTE_POINT_ADDED,
    payload: {
      id: 'a',
      index: 13,
      value: { x: 10, y: 10 },
    },
  };
  const result = interpretDiff({
    index: 13,
    item: {
      kind: constants.DIFF_KIND_N,
      rhs: { x: 10, y: 10 },
    },
    kind: constants.DIFF_KIND_A,
    path: ['notes', 'a', 'points'],
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is NOTE_POINT_DELETED type', t => {
  const expected = {
    type: actions.NOTE_POINT_DELETED,
    payload: {
      id: 'a',
      index: 13,
      prevValue: { x: 10, y: 10 },
    },
  };
  const result = interpretDiff({
    index: 13,
    item: {
      kind: constants.DIFF_KIND_D,
      lhs: { x: 10, y: 10 },
    },
    kind: constants.DIFF_KIND_A,
    path: ['notes', 'a', 'points'],
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is NOTE_POINT_X_EDITED type', t => {
  const expected = {
    type: actions.NOTE_POINT_X_EDITED,
    payload: {
      id: 'a',
      index: 0,
      prevValue: 3,
      value: 4,
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    lhs: 3,
    path: ['notes', 'a', 'points', 0, 'x'],
    rhs: 4,
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is NOTE_POINT_Y_EDITED type', t => {
  const expected = {
    type: actions.NOTE_POINT_Y_EDITED,
    payload: {
      id: 'a',
      index: 0,
      prevValue: 3,
      value: 4,
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    lhs: 3,
    path: ['notes', 'a', 'points', 0, 'y'],
    rhs: 4,
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is NOTE_SEQUENCE_ID_EDITED type', t => {
  const expected = {
    type: actions.NOTE_SEQUENCE_ID_EDITED,
    payload: {
      id: 'a',
      prevValue: 'a',
      value: 'b',
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    lhs: 'a',
    path: ['notes', 'a', 'sequenceId'],
    rhs: 'b',
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is SEQUENCE_ADDED type', t => {
  const expected = {
    type: actions.SEQUENCE_ADDED,
    payload: {
      sequence: { id: 'a' },
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_N,
    path: ['sequences'],
    rhs: { id: 'a' },
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is SEQUENCE_DELETION_REQUESTED type', t => {
  const expected = {
    type: actions.SEQUENCE_DELETION_REQUESTED,
    payload: {
      sequence: { id: 'a' },
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_D,
    lhs: { id: 'a' },
    path: ['sequences'],
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is SEQUENCE_MEASURE_COUNT_EDITED type', t => {
  const expected = {
    type: actions.SEQUENCE_MEASURE_COUNT_EDITED,
    payload: {
      id: 'a',
      prevValue: 1,
      value: 4,
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    lhs: 1,
    path: ['sequences', 'a', 'measureCount'],
    rhs: 4,
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is SEQUENCE_POSITION_EDITED type', t => {
  const expected = {
    type: actions.SEQUENCE_POSITION_EDITED,
    payload: {
      id: 'a',
      prevValue: 1,
      value: 2,
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    lhs: 1,
    path: ['sequences', 'a', 'position'],
    rhs: 2,
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is SEQUENCE_TRACK_ID_EDITED type', t => {
  const expected = {
    type: actions.SEQUENCE_TRACK_ID_EDITED,
    payload: {
      id: 'a',
      prevValue: 'a',
      value: 'b',
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    lhs: 'a',
    path: ['sequences', 'a', 'trackId'],
    rhs: 'b',
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is TRACK_ADDED type', t => {
  const expected = {
    type: actions.TRACK_ADDED,
    payload: {
      isAnyTrackSoloing: true,
      track: { id: 'a' },
    },
  };
  const result = interpretDiff(
    {
      kind: constants.DIFF_KIND_N,
      path: ['tracks'],
      rhs: { id: 'a' },
    },
    {
      tracks: {
        0: { isSoloing: true },
        1: { isSoloing: false },
      },
    },
  );
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is TRACK_DELETION_REQUESTED type', t => {
  const expected = {
    type: actions.TRACK_DELETION_REQUESTED,
    payload: {
      track: { id: 'a' },
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_D,
    lhs: { id: 'a' },
    path: ['tracks'],
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is TRACK_IS_MUTED_EDITED type', t => {
  const expected = {
    type: actions.TRACK_IS_MUTED_EDITED,
    payload: {
      id: 'a',
      prevValue: false,
      value: true,
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    lhs: false,
    path: ['tracks', 'a', 'isMuted'],
    rhs: true,
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is TRACK_IS_SOLOING_EDITED type', t => {
  const expected = {
    type: actions.TRACK_IS_SOLOING_EDITED,
    payload: {
      id: 'a',
      prevValue: false,
      value: true,
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    lhs: false,
    path: ['tracks', 'a', 'isSoloing'],
    rhs: true,
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is TRACK_VOICE_EDITED type', t => {
  const expected = {
    type: actions.TRACK_VOICE_EDITED,
    payload: {
      id: 'a',
      prevValue: 'sine',
      value: 'square',
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    lhs: 'sine',
    path: ['tracks', 'a', 'voice'],
    rhs: 'square',
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is TRACK_VOLUME_EDITED type', t => {
  const expected = {
    type: actions.TRACK_VOLUME_EDITED,
    payload: {
      id: 'a',
      prevValue: -10,
      value: -5,
    },
  };
  const result = interpretDiff({
    kind: constants.DIFF_KIND_E,
    lhs: -10,
    path: ['tracks', 'a', 'volume'],
    rhs: -5,
  });
  t.deepEqual(result, expected);
});

test('should return interpreted action when diff is UNKNOWN type', t => {
  const expected = {
    type: actions.UNKNOWN,
  };
  const result = interpretDiff({});
  t.deepEqual(result, expected);
});
