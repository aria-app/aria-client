import { gql } from '@apollo/client';

import { User } from '../../../types';

export interface MeResponse {
  me: Omit<User, 'songs'>;
}

export const ME = gql`
  query Me {
    me {
      email
      firstName
      id
      lastName
    }
  }
`;
