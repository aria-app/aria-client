import { gql } from '@apollo/client';

export const ME = gql`
  query Me {
    me {
      email
      firstName
      id
      lastName
      role
    }
  }
`;
