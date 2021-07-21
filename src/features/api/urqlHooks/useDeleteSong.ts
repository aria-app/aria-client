import { useMutation } from 'urql';

import {
  DELETE_SONG,
  DeleteSongResponse,
  DeleteSongVariables,
} from '../queries';
import { MutationHook } from './types';

export const useDeleteSong: MutationHook<
  DeleteSongResponse,
  DeleteSongVariables
> = () => useMutation(DELETE_SONG);

// import {
//   FetchResult,
//   MutationHookOptions,
//   MutationResult,
//   useMutation,
// } from '@apollo/client';
// import { useCallback } from 'react';

// import { DELETE_SONG, DeleteSongResponse } from '../queries';

// export type DeleteSongMutation = (variables: {
//   id: number;
// }) => Promise<FetchResult<any>>;

// export interface DeleteSongData {
//   deleteSong: DeleteSongResponse;
// }

// export function useDeleteSong(
//   options?: MutationHookOptions,
// ): [DeleteSongMutation, MutationResult<DeleteSongData>] {
//   const [mutation, ...rest] = useMutation(DELETE_SONG, options);

//   const wrappedMutation = useCallback(
//     ({ id }) =>
//       mutation({
//         update(cache, { data: { deleteSong } }) {
//           cache.modify({
//             fields: {
//               songs(existingSongsRef = [], { readField }) {
//                 if (!deleteSong.success) return existingSongsRef;

//                 return {
//                   ...existingSongsRef,
//                   data: existingSongsRef.data.filter(
//                     (songRef) => readField('id', songRef) !== id,
//                   ),
//                 };
//               },
//             },
//           });
//         },
//         variables: {
//           id,
//         },
//       }),
//     [mutation],
//   );

//   return [wrappedMutation, ...rest];
// }
