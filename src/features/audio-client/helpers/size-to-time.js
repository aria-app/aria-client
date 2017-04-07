import isNumber from 'lodash/fp/isNumber';

export function sizeToTime(size) {
  if (!isNumber(size)) {
    throw new Error('Size must be a number');
  }

  return `(${size + 1} * 32n)`;
}
