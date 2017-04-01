import { NAME } from '../constants';

export const NAME_SET = `${NAME}/NAME_SET`;

export const nameSet = name => ({
  type: NAME_SET,
  name,
});
