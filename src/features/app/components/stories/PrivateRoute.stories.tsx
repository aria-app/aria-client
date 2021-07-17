import {
  createHistory,
  createMemorySource,
  Link,
  LocationProvider,
  RouteComponentProps,
  Router,
} from '@reach/router';
import { Meta, Story } from '@storybook/react';
import { FC, ProviderProps, useCallback } from 'react';

import {
  AuthContext,
  AuthContextValue,
} from '../../../auth/contexts/AuthContext';
import { PrivateRoute, PrivateRouteProps } from '../PrivateRoute';

const FakeLogin: FC<RouteComponentProps & { prevPath: string }> = ({
  prevPath,
}) => (
  <div>
    Redirected to Login
    <Link to={prevPath}>Go to {prevPath}</Link>
  </div>
);

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

interface PrivateRouteArgs extends PrivateRouteProps {
  mockIsAuthenticated: boolean;
  mockLoading: boolean;
}

export default {
  component: PrivateRoute,
  title: 'App/PrivateRoute',
  argTypes: {
    component: { control: false },
    default: { table: { disable: true } },
    mockIsAuthenticated: {
      control: { type: 'boolean' },
    },
    mockLoading: {
      control: { type: 'boolean' },
    },
    location: { table: { disable: true } },
    navigate: { table: { disable: true } },
    uri: { table: { disable: true } },
  },
  decorators: [
    (Story, { args }) => {
      const { mockIsAuthenticated, mockLoading, path } = args;
      const source = createMemorySource(path);
      const history = createHistory(source);

      const getIsAuthenticated = useCallback(
        () => mockIsAuthenticated,
        [mockIsAuthenticated],
      );

      return (
        <MockAuthProvider
          valueOverrides={{
            getIsAuthenticated,
            loading: mockLoading,
          }}
        >
          <LocationProvider history={history}>
            <Router>
              <FakeLogin path="/login" prevPath={path} />
              {Story()}
            </Router>
          </LocationProvider>
        </MockAuthProvider>
      );
    },
  ],
} as Meta<PrivateRouteArgs>;

const Component = () => <div>Private Component</div>;

export const Default: Story<PrivateRouteArgs> = ({
  mockIsAuthenticated,
  mockLoading,
  ...rest
}) => <PrivateRoute {...rest} />;

Default.args = {
  component: Component,
  mockIsAuthenticated: false,
  mockLoading: false,
  path: '/foo',
};

export const Authenticated: Story<PrivateRouteArgs> = ({
  mockIsAuthenticated,
  mockLoading,
  ...rest
}) => <PrivateRoute {...rest} />;

Authenticated.args = {
  ...Default.args,
  mockIsAuthenticated: true,
};

export const Loading: Story<PrivateRouteArgs> = ({
  mockIsAuthenticated,
  mockLoading,
  ...rest
}) => <PrivateRoute {...rest} />;

Loading.args = {
  ...Default.args,
  mockLoading: true,
};
