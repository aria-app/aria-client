import { NAME } from '../constants';

export const BPM_SET = `${NAME}/BPM_SET`;

export const bpmSet = bpm => ({
  type: BPM_SET,
  bpm,
});
