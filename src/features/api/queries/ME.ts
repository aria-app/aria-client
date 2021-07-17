import { gql } from '@apollo/client';

import { User } from '../../../types';

export interface MeResponse {
  me: Pick<User, 'email' | 'firstName' | 'id' | 'lastName'>;
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
