export type ObjectWithId = {
  [key in number | string]: any;
} & {
  id: number | string;
};

export function setAtIds<T extends ObjectWithId>(
  array: T[],
  obj: Record<number | string, T>,
): Record<number | string, T> {
  return array.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), obj);
}
