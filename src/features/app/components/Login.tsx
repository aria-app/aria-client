import {
  Box,
  Button,
  Icon,
  Notice,
  Stack,
  Text,
  TextField,
  useThemeWithDefault,
} from 'aria-ui';
import MusicNoteIcon from 'mdi-react/MusicNoteIcon';
import { FC, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';

import { useLogin } from '../../api';
import { useAuth } from '../../auth';

export interface LoginFormValues {
  email: string;
  password: string;
  meta: void;
}

export type LoginProps = Record<string, never>;

export const Login: FC<LoginProps> = () => {
  const [login] = useLogin();
  const { getIsAuthenticated, handleLogin } = useAuth();
  const { clearErrors, formState, handleSubmit, register, setError } =
    useForm<LoginFormValues>();
  const { errors, isSubmitting } = formState;
  const { t } = useTranslation();
  const theme = useThemeWithDefault();

  const handleSubmitCallback = useCallback<SubmitHandler<LoginFormValues>>(
    async ({ email, password }) => {
      try {
        const { data } = await login({
          variables: { email, password },
        });

        if (!data) {
          throw new Error('Failed to log in.');
        }

        handleLogin(data.login);
      } catch (error) {
        setError('meta', error);
      }
    },
    [handleLogin, login, setError],
  );

  const emailFormProps = register('email', {
    required: 'You must enter an email.',
  });

  const passwordFormProps = register('password', {
    required: 'You must enter a password.',
  });

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
        paddingTop={8}
        sx={{
          maxWidth: theme.screenSizes.sm,
          width: '100vw',
        }}
      >
        <Stack
          element="form"
          onSubmit={handleSubmit(handleSubmitCallback)}
          space={10}
        >
          <Stack
            align="center"
            direction="row"
            space={4}
            sx={{ justifyContent: 'center' }}
          >
            <Box backgroundColor="brandPrimary" borderRadius="md" padding={3}>
              <Icon
                block
                color="brandPrimary"
                colorIsBackground
                icon={<MusicNoteIcon />}
                size="lg"
              />
            </Box>
            <Text block variant="display">
              {t('Aria')}
            </Text>
          </Stack>
          <Text sx={{ alignSelf: 'center' }} variant="header">
            {t('Log in')}
          </Text>
          <Stack space={6}>
            <TextField
              error={errors.email?.message}
              inputProps={{
                autoFocus: true,
                ...emailFormProps,
                onChange: (e) => {
                  emailFormProps.onChange(e);
                  clearErrors('meta');
                },
              }}
              label={t('Email')}
              placeholder="Enter email"
              type="email"
            />
            <TextField
              error={errors.password?.message}
              inputProps={{
                ...passwordFormProps,
                onChange: (e) => {
                  passwordFormProps.onChange(e);
                  clearErrors('meta');
                },
              }}
              label={t('Password')}
              placeholder="Enter password"
              type="password"
            />
            {errors.meta && (
              <Notice status="error">{errors.meta.message}</Notice>
            )}
          </Stack>
          <Button
            color="brandPrimary"
            isLoading={isSubmitting}
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
