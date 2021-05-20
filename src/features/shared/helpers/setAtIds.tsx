export interface ObjectWithId {
  id: string;
  [key: string]: any;
}

export default function setAtIds<T extends ObjectWithId>(
  array: T[],
  obj: Record<string, T>,
): Record<string, T> {
  return array.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), obj);
}
