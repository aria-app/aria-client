import { Meta, Story } from '@storybook/react';
import { FC, ProviderProps, useCallback } from 'react';
import { Link, MemoryRouter, Route, Switch } from 'react-router-dom';

import {
  AuthContext,
  AuthContextValue,
} from '../../../auth/contexts/AuthContext';
import { PrivateRoute, PrivateRouteProps } from '../PrivateRoute';

const FakeLogin: FC<{ prevPath: string }> = ({ prevPath }) => (
  <div>
    <div>Redirected to Login</div>
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
          <MemoryRouter initialEntries={[path]}>
            <Switch>
              <Route path="/login">
                <FakeLogin prevPath={path} />
              </Route>
              {Story()}
            </Switch>
          </MemoryRouter>
        </MockAuthProvider>
      );
    },
  ],
} as Meta<PrivateRouteArgs>;

export const Default: Story<PrivateRouteArgs> = ({
  mockIsAuthenticated,
  mockLoading,
  ...rest
}) => <PrivateRoute {...rest} />;

Default.args = {
  children: 'Private Component!',
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
