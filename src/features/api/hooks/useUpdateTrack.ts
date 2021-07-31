import { gql, useMutation } from 'urql';

import { Track } from '../../../types';
import { UrqlMutationHook } from './types';

export interface UpdateTrackResponse {
  updateTrack: {
    track: Track;
  };
}

export interface UpdateTrackVariables {
  input: {
    id: number;
    voiceId?: number;
    volume?: number;
  };
}

export const UPDATE_TRACK = gql<UpdateTrackResponse, UpdateTrackVariables>`
  mutation UpdateTrack($input: UpdateTrackInput!) {
    updateTrack(input: $input) {
      track {
        id
        position
        song {
          id
        }
        voice {
          id
          name
          toneOscillatorType
        }
        volume
      }
    }
  }
`;

export const useUpdateTrack: UrqlMutationHook<
  UpdateTrackResponse,
  UpdateTrackVariables
> = () => useMutation(UPDATE_TRACK);
