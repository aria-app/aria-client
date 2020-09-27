import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import React from 'react';
import hideIf from 'react-render-helpers/hideIf';

import shared from '../../shared';
import SongList from './SongList';

const { LoadingIndicator, Toolbar } = shared.components;

const styles = (theme) =>
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
      bottom: theme.spacing(2),
      position: 'absolute',
      right: theme.spacing(2),
    },
  });

// interface NewSongOptions {
//   name: string;
// }

// export interface DashboardProps extends WithStyles<typeof styles> {
//   isLoadingSongs?: boolean;
//   navigate?: (path: string) => void;
//   onLoad?: () => void;
//   onSongAdd?: (options: NewSongOptions) => void;
//   onSongDelete?: (song: Song) => void;
//   songs?: Array<Song>;
//   user?: User;
// }

function Dashboard(props) {
  const {
    classes,
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
      <Fade in={isLoadingSongs} mountOnEnter unmountOnExit>
        <LoadingIndicator>LOADING SONGS...</LoadingIndicator>
      </Fade>
      <div className={classes.centeredContent}>
        {hideIf(isLoadingSongs)(() => (
          <SongList
            onDelete={handleSongDelete}
            onOpen={handleSongOpen}
            songs={songs}
          />
        ))}
      </div>
      <Fab
        className={classes.addSongButton}
        color="primary"
        onClick={handleSongAdd}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default React.memo(withStyles(styles)(Dashboard));
