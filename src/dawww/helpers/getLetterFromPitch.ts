import { PitchLetter } from '../types';

type GetLetterFromPitch = (pitch: number) => PitchLetter;

export const getLetterFromPitch: GetLetterFromPitch = (pitch) => {
  return ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'][
    pitch % 12
  ] as PitchLetter;
};
