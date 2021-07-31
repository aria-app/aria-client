import { gql, useMutation } from 'urql';

import { UrqlMutationHook } from './types';

export interface DeleteTrackResponse {
  deleteTrack: {
    success: boolean;
  };
}

export interface DeleteTrackVariables {
  id: number;
}

export const DELETE_TRACK = gql<DeleteTrackResponse, DeleteTrackVariables>`
  mutation DeleteTrack($id: Int!) {
    deleteTrack(id: $id) {
      success
    }
  }
`;

export const useDeleteTrack: UrqlMutationHook<
  DeleteTrackResponse,
  DeleteTrackVariables
> = () => useMutation(DELETE_TRACK);
