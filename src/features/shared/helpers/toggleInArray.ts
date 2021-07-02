import includes from 'lodash/fp/includes';
import without from 'lodash/fp/without';

export function toggleInArray<T = any>(item: T, array: T[]): T[] {
  return includes(item, array) ? without([item], array) : [...array, item];
}
