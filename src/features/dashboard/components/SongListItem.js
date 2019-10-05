import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import shared from '../../shared';

const { IconButton } = shared.components;

const styles = theme => ({
  root: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 48,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    position: 'relative',
  },
  text: {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flex: '1 1 auto',
  },
  deleteButton: {
    marginRight: theme.spacing(-1),
  },
});

function SongListItem(props) {
  const { classes, onDelete, onOpen, song } = props;

  const handleDelete = React.useCallback(() => {
    onDelete(song);
  }, [onDelete, song]);

  const handleOpen = React.useCallback(() => {
    onOpen(song);
  }, [onOpen, song]);

  return (
    <div className={classes.root}>
      <div className={classes.text} onClick={handleOpen}>
        {song.name}
      </div>
      <IconButton
        className={classes.deleteButton}
        icon="close"
        onClick={handleDelete}
      />
    </div>
  );
}

SongListItem.propTypes = {
  onDelete: PropTypes.func,
  onOpen: PropTypes.func,
  song: PropTypes.object,
};

export default React.memo(withStyles(styles)(SongListItem));
