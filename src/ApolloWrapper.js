import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import React from 'react';

const cache = new InMemoryCache({
  typePolicies: {
    Mutation: {
      fields: {
        createNote: {
          merge: false,
        },
        createSequence: {
          merge: false,
        },
        createTrack: {
          merge: false,
        },
      },
    },
    Sequence: {
      fields: {
        notes: {
          merge: false,
        },
      },
    },
    Song: {
      fields: {
        tracks: {
          merge: false,
        },
      },
    },
    Track: {
      fields: {
        sequences: {
          merge: false,
        },
      },
    },
  },
});

function ApolloWrapper(props) {
  const client = new ApolloClient({
    cache,
    link: from([
      new RetryLink(),
      new HttpLink({ uri: process.env.REACT_APP_API_URI }),
    ]),
  });

  return <ApolloProvider client={client} {...props} />;
}

export default ApolloWrapper;
