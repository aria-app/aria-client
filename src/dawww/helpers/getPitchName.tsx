import * as constants from '../constants';
import { getLetterFromPitch } from './getLetterFromPitch';

export function getPitchName(pitch: number): string {
  const octaveNumber =
    constants.OCTAVE_RANGE.length - 1 - Math.floor(pitch / 12);
  const letter = getLetterFromPitch(pitch);
  return `${letter}${octaveNumber}`;
}
