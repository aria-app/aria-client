import set from 'lodash/set';

export function disableLooping(part) {
  set(part, 'loop', false);
}
