import { NAME } from '../constants';

export const MEASURE_COUNT_SET = `${NAME}/MEASURE_COUNT_SET`;

export const measureCountSet = measureCount => ({
  type: MEASURE_COUNT_SET,
  measureCount,
});
