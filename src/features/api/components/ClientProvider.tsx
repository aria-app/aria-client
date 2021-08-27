import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { FC, memo, ProviderProps } from 'react';

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache({
    typePolicies: {
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
  }),
  uri: process.env.apiBaseUrl || '',
});

export type ClientProviderProps = Omit<
  ProviderProps<Record<string, never>>,
  'value'
>;

export const ClientProvider: FC<ClientProviderProps> = memo((props) => {
  const { children } = props;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
});
