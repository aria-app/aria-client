import { NAME } from './constants';

export const INITIALIZED = `${NAME}/INITIALIZED`;

export const initialized = () => ({
  type: INITIALIZED,
});
