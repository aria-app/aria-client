import { basicDawwwSong } from '../../fixtures';
import { updateDawwwSongSequence } from '../updateDawwwSongSequence';

describe('updateDawwwSongSequence', () => {
  test('it should return a DawwwSong when given a Song', () => {
    const result = updateDawwwSongSequence(basicDawwwSong, {
      id: 1,
      measureCount: 4,
      notes: [
        {
          id: 1,
          points: [
            { x: 0, y: 2 },
            { x: 3, y: 2 },
          ],
          sequence: {
            id: 1,
          },
        },
      ],
      position: 0,
      track: {
        id: 1,
      },
    });

    expect(result).toEqual({
      ...basicDawwwSong,
      focusedSequenceId: 1,
      notes: {
        1: {
          id: 1,
          points: [
            { x: 0, y: 2 },
            { x: 3, y: 2 },
          ],
          sequenceId: 1,
        },
      },
    });
  });
});
