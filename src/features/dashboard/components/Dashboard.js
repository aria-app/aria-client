import PropTypes from 'prop-types';
import React from 'react';
import hideIf from 'react-render-helpers/hideIf';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import withTheme from '@material-ui/styles/withTheme';
import shared from '../../shared';
import SongList from './SongList';

const { FadeOut, Icon, LoadingIndicator, Toolbar } = shared.components;

const styles = theme =>
  createStyles({
    root: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      position: 'relative',
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
    fab: {
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '50%',
      bottom: 24,
      border: `2px solid ${theme.palette.divider}`,
      cursor: 'pointer',
      display: 'flex',
      flex: '0 0 auto',
      height: 56,
      justifyContent: 'center',
      position: 'absolute',
      right: 24,
      width: 56,
    },
    fabIcon: {},
  });

const FabIcon = withTheme(({ theme, ...rest }) => (
  <Icon color={theme.palette.primary.contrastText} {...rest} />
));

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

  const addSong = React.useCallback(() => {
    const name = window.prompt('Enter a name for the song', 'New Song');

    if (!name) return;

    onSongAdd({ name });
  }, [onSongAdd]);

  const deleteSong = React.useCallback(
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
          <SongList onDelete={deleteSong} onOpen={openSong} songs={songs} />
        ))}
      </div>
      <div className={classes.fab} onClick={addSong}>
        <FabIcon icon="plus" />
      </div>
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
