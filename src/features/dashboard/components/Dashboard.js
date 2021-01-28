import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';
import SongList from './SongList';

const {
  Box,
  Button,
  ContentBlock,
  Fade,
  LoadingIndicator,
  Stack,
  Toolbar,
} = shared.components;

Dashboard.propTypes = {
  isLoadingSongs: PropTypes.bool,
  navigate: PropTypes.func,
  onLoad: PropTypes.func,
  onSongAdd: PropTypes.func,
  onSongDelete: PropTypes.func,
  songs: PropTypes.object,
  user: PropTypes.object,
};

function Dashboard(props) {
  const {
    isLoadingSongs,
    navigate,
    onLoad,
    onSongAdd,
    onSongDelete,
    songs,
    user,
  } = props;

  const handleSongAdd = React.useCallback(() => {
    const name = window.prompt('Enter a name for the song', 'New Song');

    if (!name) return;

    onSongAdd({ name });
  }, [onSongAdd]);

  const handleSongDelete = React.useCallback(
    (song) => {
      const shouldDelete = window.confirm(
        `Are you sure you want to delete the song "${song.name}"?`,
      );

      if (!shouldDelete) return;

      onSongDelete(song);
    },
    [onSongDelete],
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

    navigate(`/sign-out`);
  }, [navigate]);

  React.useEffect(() => {
    onLoad();

    window.document.title = 'Dashboard - Aria';
  }, [onLoad]);

  return (
    <Stack space={4}>
      <Toolbar position="top">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            onClick={handleUserClick}
            sx={{
              borderRadius: 9999,
              height: 40,
              overflow: 'hidden',
              width: 40,
            }}
          >
            <img
              alt="User"
              src={user.photoURL}
              style={{ height: '100%', width: '100%' }}
              title={user.email}
            />
          </Box>
        </Box>
      </Toolbar>
      <Stack>
        <Fade in={isLoadingSongs} mountOnEnter unmountOnExit>
          <LoadingIndicator>LOADING SONGS...</LoadingIndicator>
        </Fade>
        <Fade in={!isLoadingSongs} mountOnEnter unmountOnExit>
          <ContentBlock>
            <SongList
              onDelete={handleSongDelete}
              onOpen={handleSongOpen}
              songs={songs}
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
    </Stack>
  );
}

export default React.memo(Dashboard);
