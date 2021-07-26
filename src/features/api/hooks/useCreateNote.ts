import { useMutation } from 'urql';

import {
  CREATE_NOTE,
  CreateNoteResponse,
  CreateNoteVariables,
} from '../queries';
import { MutationHook } from './types';

export const useCreateNote: MutationHook<
  CreateNoteResponse,
  CreateNoteVariables
> = () => useMutation(CREATE_NOTE);
