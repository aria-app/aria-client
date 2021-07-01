import { useMutation, useQuery } from '@apollo/client';
import AddIcon from '@material-ui/icons/Add';
import { RouteComponentProps } from '@reach/router';
import { Box, Button, Stack, Toolbar } from 'aria-ui';
import { memo, ReactElement, useCallback, useEffect } from 'react';

import api from '../../api';
import auth from '../../auth';
import { Fade, LoadingIndicator } from '../../shared';
import SongList from './SongList';

const { useAuth } = auth.hooks;

function Dashboard(props: RouteComponentProps): ReactElement {
  const { navigate } = props;
  const { logout, user } = useAuth();
  const [createSong, { loading: createLoading }] = useMutation(
    api.queries.CREATE_SONG,
  );
  const [deleteSong, { loading: deleteLoading }] = useMutation(
    api.queries.DELETE_SONG,
  );
  const { data, loading: getLoading } = useQuery(api.queries.GET_SONGS, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    skip: !user,
    variables: {
      sort: 'updatedAt',
      sortDirection: 'desc',
      userId: user && user.id,
    },
  });

  const loading = createLoading || deleteLoading || getLoading;

  const handleSongAdd = useCallback(async () => {
    const name = window.prompt('Enter a name for the song', 'New Song');

    if (!name) return;

    try {
      await createSong({
        variables: {
          input: {
            name,
          },
        },
      });
    } catch (e) {
      console.error(e.message);
    }
  }, [createSong]);

  const handleSongDelete = useCallback(
    async (song) => {
      const shouldDelete = window.confirm(
        `Are you sure you want to delete the song "${song.name}"?`,
      );

      if (!shouldDelete) return;

      await deleteSong({
        variables: {
          id: song.id,
        },
      });
    },
    [deleteSong],
  );

  const handleSongOpen = useCallback(
    (song) => {
      navigate?.(`edit-song/${song.id}`);
    },
    [navigate],
  );

  const handleUserClick = useCallback(() => {
    const shouldSignOut = window.confirm('Do you want to sign out?');

    if (!shouldSignOut) return;

    logout();
  }, [logout]);

  useEffect(() => {
    window.document.title = 'Dashboard - Aria';
  }, []);

  return (
    <Stack space={4}>
      <Toolbar
        padding={2}
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {user && (
          <Button
            onClick={handleUserClick}
            text={`${user.firstName} ${user.lastName}`}
            variant="minimal"
          />
        )}
      </Toolbar>
      <Fade in={loading}>
        <LoadingIndicator>LOADING SONGS...</LoadingIndicator>
      </Fade>
      <Fade in={!loading}>
        <Box
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: 768,
            width: '100vw',
          }}
        >
          <SongList
            onDelete={handleSongDelete}
            onOpen={handleSongOpen}
            songs={data && data.songs.data}
          />
        </Box>
      </Fade>
      <Box
        sx={{
          bottom: 4,
          position: 'absolute',
          right: 4,
        }}
      >
        <Button
          color="brandPrimary"
          onClick={handleSongAdd}
          startIcon={<AddIcon />}
          text="Add Song"
          variant="outlined"
        />
      </Box>
    </Stack>
  );
}

export default memo(Dashboard);
