interface ObjectWithId {
  id: string;
  [key: string]: any;
}

export function setAtIds(
  array: Array<ObjectWithId>,
  obj: { [key: string]: ObjectWithId },
) {
  return array.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), obj);
}
