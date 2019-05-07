import invokeArgs from 'lodash/fp/invokeArgs';

export function stop(part) {
  invokeArgs('stop', [0], part);
}
