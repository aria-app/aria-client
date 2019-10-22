interface ObjectWithId {
  id: string;
  [key: string]: any;
}

interface ObjectWithIdMap {
  [key: string]: ObjectWithId;
}

export default function setAtIds(
  array: Array<ObjectWithId>,
  obj: ObjectWithIdMap,
) {
  return array.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), obj);
}
