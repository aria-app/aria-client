import { NAME } from '../constants';

export const ID_SET = `${NAME}/ID_SET`;

export const idSet = id => ({
  type: ID_SET,
  id,
});
