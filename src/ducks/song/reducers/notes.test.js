import * as actions from '../actions';
import * as helpers from '../helpers';
import reducer from './notes';

describe('Song Notes Reducer', () => {
  it('should return the initial state', () => {
    const expected = {
      dict: {},
      ids: [],
    };
    const result = reducer(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should handle notesSet action', () => {
    const notes = [
      helpers.createNote({
        points: [
          { x: 0, y: 3 },
          { x: 2, y: 3 },
        ],
        sequenceId: 'my-sequence',
      }),
      helpers.createNote({
        points: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
        ],
        sequenceId: 'my-sequence',
      }),
    ];
    const expected = {
      dict: {
        [notes[0].id]: notes[0],
        [notes[1].id]: notes[1],
      },
      ids: [
        notes[0].id,
        notes[1].id,
      ],
    };
    const result = reducer(undefined, actions.notesSet(notes));

    expect(result).toEqual(expected);
  });
});
