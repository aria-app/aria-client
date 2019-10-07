import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import hideIf from 'react-render-helpers/hideIf';
import shared from '../../shared';
import SongList from './SongList';

const { FadeOut, LoadingIndicator, Toolbar } = shared.components;

const styles = theme =>
  createStyles({
    root: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      position: 'relative',
    },
    toolbar: {
      borderBottom: `2px solid ${theme.palette.divider}`,
    },
    centeredContent: {
      alignSelf: 'center',
      maxWidth: theme.breakpoints.values.sm,
      width: '100%',
    },
    userInfo: {
      alignItems: 'center',
      display: 'flex',
      flex: '0 0 auto',
      height: '100%',
    },
    userImage: {
      borderRadius: '50%',
      height: 40,
      width: 40,
    },
    addSongButton: {
      bottom: theme.spacing(3),
      position: 'absolute',
      right: theme.spacing(3),
      // alignItems: 'center',
      // backgroundColor: theme.palette.primary.main,
      // borderRadius: '50%',
      // bottom: 24,
      // border: `2px solid ${theme.palette.divider}`,
      // cursor: 'pointer',
      // display: 'flex',
      // flex: '0 0 auto',
      // height: 56,
      // justifyContent: 'center',
      // position: 'absolute',
      // right: 24,
      // width: 56,
    },
  });

function Dashboard(props) {
  const {
    classes,
    history,
    isLoadingSongs,
    onLoad,
    onSongAdd,
    onSongDelete,
    songs,
    user,
  } = props;

  const handleAddSong = React.useCallback(() => {
    const name = window.prompt('Enter a name for the song', 'New Song');

    if (!name) return;

    onSongAdd({ name });
  }, [onSongAdd]);

  const handleDeleteSong = React.useCallback(
    song => {
      const shouldDelete = window.confirm(
        `Are you sure you want to delete the song "${song.name}"?`,
      );

      if (!shouldDelete) return;

      onSongDelete(song);
    },
    [onSongDelete],
  );

  const openSong = React.useCallback(
    song => {
      history.push(`/song/${song.id}`);
    },
    [history],
  );

  React.useEffect(() => {
    onLoad();

    window.document.title = 'Dashboard - Aria';
  }, [onLoad]);

  return (
    <div className={classes.root}>
      <Toolbar
        className={classes.toolbar}
        rightItems={
          <React.Fragment>
            <div className={classes.userInfo}>
              <img
                className={classes.userImage}
                alt="User"
                src={user.photoURL}
                title={user.email}
              />
            </div>
          </React.Fragment>
        }
      />
      <FadeOut isVisible={isLoadingSongs}>
        <LoadingIndicator>LOADING SONGS...</LoadingIndicator>
      </FadeOut>
      <div className={classes.centeredContent}>
        {hideIf(isLoadingSongs)(() => (
          <SongList
            onDelete={handleDeleteSong}
            onOpen={openSong}
            songs={songs}
          />
        ))}
      </div>
      <Fab
        className={classes.addSongButton}
        color="primary"
        onClick={handleAddSong}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  isLoadingSongs: PropTypes.bool,
  onLoad: PropTypes.func,
  onSongAdd: PropTypes.func,
  onSongDelete: PropTypes.func,
  songs: PropTypes.object,
  user: PropTypes.object,
};

export default React.memo(withStyles(styles)(Dashboard));
