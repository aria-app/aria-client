import { devtoolsExchange } from '@urql/devtools';
import { FC, ReactNode } from 'react';
import { createClient, Provider } from 'urql';

export interface UrqlWrapperProps {
  children: ReactNode;
}

const client = createClient({
  url: process.env.REACT_APP_API_URI as string,
  exchanges: [devtoolsExchange],
});

export const UrqlWrapper: FC<ReactNode> = (props) => {
  const { children } = props;

  return <Provider value={client}>{children}</Provider>;
};
