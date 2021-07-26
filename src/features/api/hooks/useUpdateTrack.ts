import { gql } from '@apollo/client';
import { useMutation } from 'urql';

import { Track } from '../../../types';
import { MutationHook } from './types';

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

export const UPDATE_TRACK = gql`
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

export const useUpdateTrack: MutationHook<
  UpdateTrackResponse,
  UpdateTrackVariables
> = () => useMutation(UPDATE_TRACK);
