import invoke from 'lodash/fp/invoke';

export function dispose(instrument) {
  invoke('dispose', instrument);
}
