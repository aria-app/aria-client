import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { devtoolsExchange } from '@urql/devtools';
import { merge } from 'lodash';
import { FC, memo, ReactNode, useCallback, useMemo, useState } from 'react';
import {
  Client,
  ClientOptions,
  createClient as createUrqlClient,
  dedupExchange,
  fetchExchange,
  Provider,
} from 'urql';

import { ClientContext } from '../../contexts/ClientContext';
import { cacheExchange } from './cacheExchange';

const createClient = (clientOptions) =>
  createUrqlClient(
    merge(
      {
        url: process.env.REACT_APP_API_URI || '',
        exchanges: [
          devtoolsExchange,
          dedupExchange,
          cacheExchange,
          fetchExchange,
        ],
      },
      clientOptions,
    ),
  );

export interface ClientProviderProps {
  children: ReactNode;
  clientOptions?: Partial<ClientOptions>;
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URI || '',
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
});

export const ClientProvider: FC<ClientProviderProps> = memo((props) => {
  const { children, clientOptions } = props;
  const [urqlClient, setUrqlClient] = useState<Client>(
    createClient(clientOptions),
  );

  const handleResetClient = useCallback(() => {
    setUrqlClient(createClient(clientOptions));
  }, [clientOptions]);

  const value = useMemo(
    () => ({
      resetClient: handleResetClient,
    }),
    [handleResetClient],
  );

  return (
    <ApolloProvider client={client}>
      <ClientContext.Provider value={value}>
        <Provider value={urqlClient}>{children}</Provider>
      </ClientContext.Provider>
    </ApolloProvider>
  );
});
