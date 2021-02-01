import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Redirect } from '@reach/router';
import React from 'react';

import auth from '../../auth';
import { LOGIN } from '../documentNodes';

const { useAuth } = auth.hooks;

const Root = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

const StyledContainer = styled(Container)((props) => ({
  backgroundColor: props.theme.palette.background.paper,
  flex: 1,
}));

export default function Login() {
  const [login, { error, loading }] = useMutation(LOGIN);
  const { getIsAuthenticated, handleLogin, user } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = React.useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail],
  );

  const handlePasswordChange = React.useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword],
  );

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await login({
          variables: { email, password },
        });

        handleLogin(data.login);
        // eslint-disable-next-line
      } catch {}
    },
    [email, handleLogin, login, password],
  );

  if (getIsAuthenticated()) {
    return <Redirect noThrow to="/" />;
  }

  return (
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
