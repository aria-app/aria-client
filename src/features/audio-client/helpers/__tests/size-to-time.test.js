import { sizeToTime } from '../size-to-time';

describe('sizeToTime', () => {
  it('should return correctly formatted time', () => {
    const size = 2;
    const expected = '(3 * 32n)';
    expect(sizeToTime(size)).toEqual(expected);
  });

  it('should throw if size is not number', () => {
    const size = '2';
    expect(() => sizeToTime(size)).toThrow();
  });
});
