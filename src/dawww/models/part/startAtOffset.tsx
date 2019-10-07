import invokeArgs from 'lodash/fp/invokeArgs';

export function startAtOffset(offsetTime, part) {
  invokeArgs('start', [undefined, offsetTime], part);
}
