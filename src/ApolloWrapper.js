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
        createSequence: {
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
