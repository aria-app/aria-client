import invokeArgs from 'lodash/fp/invokeArgs';

export function startAtTime(startTime, part) {
  invokeArgs('start', [startTime], part);
}
