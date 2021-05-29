import { basicDawwwSong, basicSong } from '../../fixtures';
import { songToDawwwSong } from '../songToDawwwSong';

describe('songToDawwwSong', () => {
  test('it should return a DawwwSong when given a Song', () => {
    const result = songToDawwwSong(basicSong);

    expect(result).toEqual(basicDawwwSong);
  });
});
