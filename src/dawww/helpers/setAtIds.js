export function setAtIds(array, obj) {
  return array.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), obj);
}
