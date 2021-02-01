import { useMutation, useQuery } from '@apollo/client';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';

import api from '../../api';
import auth from '../../auth';
import shared from '../../shared';
import SongList from './SongList';

const { CREATE_SONG, GET_SONGS } = api.documentNodes;
const { useAuth } = auth.hooks;
const {
  Box,
  Button,
  ContentBlock,
  Fade,
  LoadingIndicator,
  Stack,
  Toolbar,
  Typography,
} = shared.components;

Dashboard.propTypes = {
  navigate: PropTypes.func,
};

function Dashboard(props) {
  const { navigate } = props;
  const { logout, user } = useAuth();
  const { data, loading, refetch } = useQuery(GET_SONGS, {
    variables: {
      sort: 'dateModified',
      sortDirection: 'desc',
    },
  });
  const [createSong] = useMutation(CREATE_SONG);

  const deleteSong = React.useCallback((song) => {
    console.log('deleted song', song);
  }, []);

  const handleSongAdd = React.useCallback(async () => {
    const name = window.prompt('Enter a name for the song', 'New Song');

    if (!name) return;

    try {
      await createSong({
        variables: {
          options: {
            name,
          },
        },
      });
      refetch();
    } catch (e) {
      console.error(e.message);
    }
  }, [createSong, refetch]);

  const handleSongDelete = React.useCallback(
    (song) => {
      const shouldDelete = window.confirm(
        `Are you sure you want to delete the song "${song.name}"?`,
      );

      if (!shouldDelete) return;

      deleteSong(song);
    },
    [deleteSong],
  );

  const handleSongOpen = React.useCallback(
    (song) => {
      navigate(`edit-song/${song.id}`);
    },
    [navigate],
  );

  const handleUserClick = React.useCallback(() => {
    const shouldSignOut = window.confirm('Do you want to sign out?');

    if (!shouldSignOut) return;

    logout();
  }, [logout]);

  React.useEffect(() => {
    window.document.title = 'Dashboard - Aria';
  }, []);

  return (
    <Stack space={4}>
      <Toolbar
        position="top"
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingX: 4,
        }}
      >
        {user && (
          <Typography onClick={handleUserClick}>
            {user.firstName} {user.lastName}
          </Typography>
        )}
      </Toolbar>
      <Fade in={loading}>
        <LoadingIndicator>LOADING SONGS...</LoadingIndicator>
      </Fade>
      <Fade in={!loading}>
        <ContentBlock>
          <SongList
            onDelete={handleSongDelete}
            onOpen={handleSongOpen}
            songs={data && data.songs.data}
          />
        </ContentBlock>
      </Fade>
      <Box
        sx={{
          bottom: 4,
          position: 'absolute',
          right: 4,
        }}
      >
        <Button
          color="primary.main"
          onClick={handleSongAdd}
          startIcon={<AddIcon />}
          variant="outlined"
        >
          Add Song
        </Button>
      </Box>
    </Stack>
  );
}

export default React.memo(Dashboard);
