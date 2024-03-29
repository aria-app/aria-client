import { Voice } from '../types';

export const voices: Voice[] = [
  {
    __typename: 'Voice',
    id: 1,
    name: 'Pulse',
    toneOscillatorType: 'pulse',
  },
  {
    __typename: 'Voice',
    id: 2,
    name: 'Sawtooth',
    toneOscillatorType: 'sawtooth',
  },
  {
    __typename: 'Voice',
    id: 3,
    name: 'Sine',
    toneOscillatorType: 'sine',
  },
];
