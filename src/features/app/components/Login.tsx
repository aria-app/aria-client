import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Stack,
  Text,
  TextField,
  useThemeWithDefault,
} from 'aria-ui';
import { FC, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';

import { LOGIN } from '../../api';
import { useAuth } from '../../auth';

export type LoginProps = Record<string, never>;

export const Login: FC<LoginProps> = () => {
  const [login, { client, error, loading }] = useMutation(LOGIN);
  const { getIsAuthenticated, handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const theme = useThemeWithDefault();

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
    <Redirect to="/" />
  ) : (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        backgroundColor="backgroundContrast"
        borderRadius="md"
        padding={6}
        sx={{
          maxWidth: theme.screenSizes.sm,
          width: '100vw',
        }}
      >
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
};
