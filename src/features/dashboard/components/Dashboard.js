import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';
import SongList from './SongList';

const {
  Box,
  Column,
  Columns,
  ContentBlock,
  Stack,
  LoadingIndicator,
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
    <Stack space="medium">
      <Box
        backgroundColor="paper"
        borderBottomWidth={2}
        borderColor="border"
        padding="xsmall"
      >
        <Columns space="medium">
          <Column />
          <Column width="content">
            <Box
              borderRadius="full"
              isInteractionOverlayVisible
              onClick={handleUserClick}
              size={5}
            >
              <img
                alt="User"
                src={user.photoURL}
                style={{ height: '100%', width: '100%' }}
                title={user.email}
              />
            </Box>
          </Column>
        </Columns>
      </Box>
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
        <Box bottom="medium" position="absolute" right="medium">
          <Fab color="primary" onClick={handleSongAdd}>
            <AddIcon />
          </Fab>
        </Box>
      </Stack>
    </Stack>
  );
}

export default React.memo(Dashboard);
