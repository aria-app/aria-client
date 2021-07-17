import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
  Router,
} from '@reach/router';
import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';
import { FC, ProviderProps, useCallback } from 'react';

import { LOGIN, LoginResponse } from '../../../api';
import {
  AuthContext,
  AuthContextValue,
} from '../../../auth/contexts/AuthContext';
import { Login, LoginProps } from '../Login';
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

const LoggedInComponent = () => <div>Logged In!</div>;

interface LoginArgs extends LoginProps {
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
      const source = createMemorySource('/login');
      const history = createHistory(source);

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
            <LocationProvider history={history}>
              <Box
                as={Router}
                sx={{
                  display: 'flex',
                  flex: '1 1 auto',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {Story()}
                <PrivateRoute component={LoggedInComponent} path="/" />
              </Box>
            </LocationProvider>
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
  path: '/login',
};
