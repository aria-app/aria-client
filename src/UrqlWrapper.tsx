import { devtoolsExchange } from '@urql/devtools';
import { merge } from 'lodash';
import { FC, ReactNode } from 'react';
import { ClientOptions, createClient, defaultExchanges, Provider } from 'urql';

export interface UrqlWrapperProps {
  children: ReactNode;
  clientOptions?: Partial<ClientOptions>;
}

export const UrqlWrapper: FC<UrqlWrapperProps> = (props) => {
  const { children, clientOptions } = props;

  const client = createClient(
    merge(
      {
        url: process.env.REACT_APP_API_URI || '',
        exchanges: [devtoolsExchange, ...defaultExchanges],
      },
      clientOptions,
    ),
  );

  return <Provider value={client}>{children}</Provider>;
};
