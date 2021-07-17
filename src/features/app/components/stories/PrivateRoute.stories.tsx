import {
  createHistory,
  createMemorySource,
  LocationProvider,
  Router,
} from '@reach/router';
import { Meta, Story } from '@storybook/react';
import { FC, ProviderProps } from 'react';

import {
  AuthContext,
  AuthContextValue,
} from '../../../auth/contexts/AuthContext';
import { PrivateRoute } from '../PrivateRoute';

export default {
  component: PrivateRoute,
  title: 'App/PrivateRoute',
  argTypes: {
    component: { control: false },
    default: { table: { disable: true } },
    location: { table: { disable: true } },
    navigate: { table: { disable: true } },
    path: { control: false },
    uri: { table: { disable: true } },
  },
} as Meta;

const MockAuthProvider: FC<
  Partial<ProviderProps<AuthContextValue>> & {
    valueOverrides?: Partial<AuthContextValue>;
  }
> = ({ valueOverrides = {}, ...rest }) => (
  <AuthContext.Provider
    value={{
      getIsAuthenticated: () => false,
      handleLogin: () => {},
      loading: false,
      logout: () => {},
      user: undefined,
      ...valueOverrides,
    }}
    {...rest}
  />
);

const Component = () => <div>Private Component</div>;

export const Default: Story<any> = (args) => {
  const source = createMemorySource(args.path);
  const history = createHistory(source);

  return (
    <MockAuthProvider>
      <LocationProvider history={history}>
        <Router>
          <PrivateRoute {...args} />
        </Router>
      </LocationProvider>
    </MockAuthProvider>
  );
};

Default.args = {
  component: Component,
  path: '/foo',
};

export const Authenticated: Story<any> = (args) => {
  const source = createMemorySource(args.path);
  const history = createHistory(source);

  return (
    <MockAuthProvider valueOverrides={{ getIsAuthenticated: () => true }}>
      <LocationProvider history={history}>
        <Router>
          <PrivateRoute {...args} />
        </Router>
      </LocationProvider>
    </MockAuthProvider>
  );
};

Authenticated.args = {
  ...Default.args,
};

export const Loading: Story<any> = (args) => {
  const source = createMemorySource(args.path);
  const history = createHistory(source);

  return (
    <MockAuthProvider valueOverrides={{ loading: true }}>
      <LocationProvider history={history}>
        <Router>
          <PrivateRoute {...args} />
        </Router>
      </LocationProvider>
    </MockAuthProvider>
  );
};

Loading.args = {
  ...Default.args,
};
