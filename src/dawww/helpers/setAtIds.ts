import { SetAtIds } from '../types';

export const setAtIds: SetAtIds = (array, obj) => {
  return array.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), obj);
};
