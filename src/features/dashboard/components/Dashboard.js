import PropTypes from 'prop-types';
import React from 'react';
import hideIf from 'react-render-helpers/hideIf';
import withStyles from '@material-ui/styles/withStyles';
import withTheme from '@material-ui/styles/withTheme';
import shared from '../../shared';
import SongList from './SongList';

const { FadeOut, Icon, LoadingIndicator, Toolbar } = shared.components;

const styles = theme => ({
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

class Dashboard extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    isLoadingSongs: PropTypes.bool,
    onLoad: PropTypes.func,
    onSongAdd: PropTypes.func,
    onSongDelete: PropTypes.func,
    songs: PropTypes.object,
    user: PropTypes.object,
  };

  componentDidMount() {
    this.props.onLoad();

    window.document.title = 'Dashboard - Aria';
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Toolbar
          rightItems={
            <React.Fragment>
              <div className={this.props.classes.userInfo}>
                <img
                  className={this.props.classes.userImage}
                  alt="User"
                  src={this.props.user.photoURL}
                  title={this.props.user.email}
                />
              </div>
            </React.Fragment>
          }
        />
        <FadeOut isVisible={this.props.isLoadingSongs}>
          <LoadingIndicator>LOADING SONGS...</LoadingIndicator>
        </FadeOut>
        <div className={this.props.classes.centeredContent}>
          {hideIf(this.props.isLoadingSongs)(() => (
            <SongList
              onDelete={this.deleteSong}
              onOpen={this.openSong}
              songs={this.props.songs}
            />
          ))}
        </div>
        <div className={this.props.classes.fab} onClick={this.addSong}>
          <FabIcon icon="plus" />
        </div>
      </div>
    );
  }

  addSong = () => {
    const name = window.prompt('Enter a name for the song', 'New Song');

    if (!name) return;

    this.props.onSongAdd({
      name,
    });
  };

  deleteSong = song => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete the song "${song.name}"?`,
    );

    if (!shouldDelete) return;

    this.props.onSongDelete(song);
  };

  openSong = song => {
    this.props.history.push(`/song/${song.id}`);
  };
}

export default withStyles(styles)(Dashboard);
