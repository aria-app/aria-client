import { Sequence } from '../types';

export const sequence: Sequence = {
  id: 1,
  measureCount: 1,
  notes: [
    {
      id: 100,
      points: [
        { x: 0, y: 34 },
        { x: 1, y: 34 },
      ],
      sequence: { id: 1 },
    },
    {
      id: 200,
      points: [
        { x: 2, y: 35 },
        { x: 3, y: 35 },
      ],
      sequence: { id: 1 },
    },
  ],
  position: 0,
  track: { id: 1 },
};
