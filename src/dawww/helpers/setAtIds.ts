import { ObjectWithId } from '../types';

export function setAtIds<T extends ObjectWithId = ObjectWithId>(
  array: T[],
  obj: Record<number, T>,
): Record<number, T> {
  return array.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), obj);
}
