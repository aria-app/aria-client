import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Redirect, RouteComponentProps } from '@reach/router';
import { ReactElement, useCallback, useEffect, useState } from 'react';

import api from '../../api';
import auth from '../../auth';

const { useAuth } = auth.hooks;

const Root = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  flex: 1,
}));

export default function Login(props: RouteComponentProps): ReactElement {
  const [login, { client, error, loading }] = useMutation(api.queries.LOGIN);
  const { getIsAuthenticated, handleLogin, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail],
  );

  const handlePasswordChange = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword],
  );

  const handleSubmit = useCallback(
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
    <Root>
      <StyledContainer maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Box paddingY={3}>
            <div>Log in to view and manage songs and data.</div>
            {user && (
              <div style={{ color: 'blue' }}>
                {user.firstName} {user.lastName}
              </div>
            )}
            <Box paddingTop={3}>
              <TextField
                fullWidth
                label="Email"
                onChange={handleEmailChange}
                type="email"
                value={email}
              />
            </Box>
            <Box paddingTop={3}>
              <TextField
                fullWidth
                label="Password"
                onChange={handlePasswordChange}
                type="password"
                value={password}
              />
            </Box>
            {error && (
              <Box paddingTop={3}>
                <Typography color="error">{error.message}</Typography>
              </Box>
            )}
            <Box display="flex" justifyContent="flex-end" paddingTop={3}>
              <Button color="primary" type="submit" variant="contained">
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  'Log In'
                )}
              </Button>
            </Box>
          </Box>
        </form>
      </StyledContainer>
    </Root>
  );
}
