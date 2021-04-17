import { useQuery } from '@apollo/client';
import { Voice } from '../../../types';

import * as queries from '../queries';

export default function useGetVoices(...args) {
  return useQuery<{ voices: Voice[] }>(queries.GET_VOICES, ...args);
}
