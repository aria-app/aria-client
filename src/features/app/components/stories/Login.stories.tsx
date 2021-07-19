import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Meta, Story } from '@storybook/react';
import { FC, ProviderProps, useCallback } from 'react';
import { MemoryRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { LOGIN, LoginResponse } from '../../../api';
import {
  AuthContext,
  AuthContextValue,
} from '../../../auth/contexts/AuthContext';
import { Login } from '../Login';
import { PrivateRoute } from '../PrivateRoute';

const mocks: MockedResponse<Record<string, any>>[] = [
  {
    request: {
      query: LOGIN,
      variables: {
        email: 'user@ariaapp.io',
        password: 'password',
      },
    },
    result: {
      data: {
        login: {
          expiresAt: '2022-01-01',
          success: true,
        },
      } as LoginResponse,
    },
  },
];

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

interface LoginArgs {
  mockIsAuthenticated: boolean;
  mockHandleLogin: boolean;
}

export default {
  component: Login,
  title: 'App/Login',
  argTypes: {
    component: { control: false },
    default: { table: { disable: true } },
    mockIsAuthenticated: {
      control: { type: 'boolean' },
    },
    mockHandleLogin: {
      action: 'handleLogin',
    },
    location: { table: { disable: true } },
    navigate: { table: { disable: true } },
    path: { table: { disable: true } },
    uri: { table: { disable: true } },
  },
  decorators: [
    (Story, { args }) => {
      const { mockIsAuthenticated, mockHandleLogin } = args;

      const getIsAuthenticated = useCallback(
        () => mockIsAuthenticated,
        [mockIsAuthenticated],
      );

      return (
        <MockedProvider mocks={mocks}>
          <MockAuthProvider
            valueOverrides={{
              getIsAuthenticated,
              handleLogin: mockHandleLogin,
            }}
          >
            <MemoryRouter initialEntries={['/login']}>
              <Switch>
                <Route path="/login">{Story()}</Route>
                <PrivateRoute path="/">Logged In!</PrivateRoute>
              </Switch>
            </MemoryRouter>
          </MockAuthProvider>
        </MockedProvider>
      );
    },
  ],
} as Meta<LoginArgs>;

export const Default: Story<LoginArgs> = ({
  mockIsAuthenticated,
  mockHandleLogin,
  ...rest
}) => <Login {...rest} />;

Default.args = {
  mockIsAuthenticated: false,
};
