import { getNoteName } from '../get-note-name';

describe('getNoteName', () => {
  it('should return correct name, given y position', () => {
    const expected = 'C3';
    const result = getNoteName(47);

    expect(result).toEqual(expected);
  });
});
