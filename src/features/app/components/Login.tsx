import { useMutation } from '@apollo/client';
import { Redirect, RouteComponentProps } from '@reach/router';
import { Box, Button, Stack, Text, TextField } from 'aria-ui';
import {
  MouseEventHandler,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import api from '../../api';
import auth from '../../auth';

const { useAuth } = auth.hooks;

export default function Login(props: RouteComponentProps): ReactElement {
  const [login, { client, error, loading }] = useMutation(api.queries.LOGIN);
  const { getIsAuthenticated, handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  const handleEmailChange = useCallback<(value: string) => void>(
    (value) => {
      setEmail(value);
    },
    [setEmail],
  );

  const handlePasswordChange = useCallback<(value: string) => void>(
    (value) => {
      setPassword(value);
    },
    [setPassword],
  );

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await login({
          variables: { email, password },
        });

        handleLogin(data.login);
      } catch (e) {
        console.error(e.message);
      }
    },
    [email, handleLogin, login, password],
  );

  useEffect(() => {
    if (getIsAuthenticated()) return;

    client.resetStore();
  }, [client, getIsAuthenticated]);

  return getIsAuthenticated() ? (
    <Redirect noThrow to="/" />
  ) : (
    <Box
      backgroundColor="backgroundDefault"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box backgroundColor="backgroundContrast" borderRadius="md" padding={6}>
        <Stack element="form" onSubmit={handleSubmit} space={8}>
          <Text variant="header">
            Log in to view and manage songs and data.
          </Text>
          <Stack space={4}>
            <TextField
              label="Email"
              onValueChange={handleEmailChange}
              type="email"
              value={email}
            />
            <TextField
              error={error?.message}
              label="Password"
              onValueChange={handlePasswordChange}
              type="password"
              value={password}
            />
          </Stack>
          <Button
            color="brandPrimary"
            isLoading={loading}
            sx={{ alignSelf: 'flex-end' }}
            text={t('Log in')}
            type="submit"
            variant="contained"
          />
        </Stack>
      </Box>
    </Box>
  );
}
