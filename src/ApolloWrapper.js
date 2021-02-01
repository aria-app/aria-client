import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import React from 'react';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      songs: {
        merge: true,
      },
    },
  },
});

function ApolloWrapper(props) {
  const client = new ApolloClient({
    cache,
    link: new HttpLink({
      uri: process.env.REACT_APP_API_URI,
    }),
  });

  return <ApolloProvider client={client} {...props} />;
}

export default ApolloWrapper;
