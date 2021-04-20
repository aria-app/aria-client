import * as constants from '../constants';
import { getLetterFromPitch } from './getLetterFromPitch';

type GetPitchName = (pitch: number) => string;

export const getPitchName: GetPitchName = (pitch) => {
  const octaveNumber =
    constants.OCTAVE_RANGE.length - 1 - Math.floor(pitch / 12);
  const letter = getLetterFromPitch(pitch);
  return `${letter}${octaveNumber}`;
};
