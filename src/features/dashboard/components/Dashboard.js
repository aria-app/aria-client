import AddIcon from '@material-ui/icons/Add';
import auth from 'features/auth';
import shared from 'features/shared';
import PropTypes from 'prop-types';
import React from 'react';

import SongList from './SongList';

const { useAuth } = auth.hooks;
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
  navigate: PropTypes.func,
  onLoad: PropTypes.func,
  onSongAdd: PropTypes.func,
  onSongDelete: PropTypes.func,
};

function Dashboard(props) {
  const { navigate, onLoad, onSongAdd, onSongDelete } = props;
  const { user } = useAuth();
  const [songs, setSongs] = React.useState();

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

  React.useEffect(() => {
    setSongs(null);
    shared.firebase
      .getDB()
      .collection('songs')
      .where('userId', '==', user.uid)
      .get()
      .then((querySnapshot) => {
        setSongs(
          shared.helpers.setAtIds(
            querySnapshot.docs.map((doc) => doc.data()),
            {},
          ),
        );
      });
  }, [setSongs, user]);

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
        <Fade in={!songs} mountOnEnter unmountOnExit>
          <LoadingIndicator>LOADING SONGS...</LoadingIndicator>
        </Fade>
        <Fade in={!!songs} mountOnEnter unmountOnExit>
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
