import { useQuery } from 'urql';

import { ME, MeResponse, MeVariables } from '../queries';
import { QueryHook } from './types';

export const useMe: QueryHook<MeResponse, MeVariables> = (args = {}) =>
  useQuery({ query: ME, ...args });
