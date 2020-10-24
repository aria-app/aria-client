import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = (theme) => ({
  root: {
    ...theme.typography.body1,
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.action.hover}`,
    borderRadius: theme.shape.borderRadius * 2,
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    fontWeight: 600,
    height: 56,
    marginBottom: theme.spacing(1),
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
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: 40,
    marginRight: theme.spacing(-1),
    width: 40,
  },
});

SongListItem.propTypes = {
  onDelete: PropTypes.func,
  onOpen: PropTypes.func,
  song: PropTypes.object,
};

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
      <div className={classes.deleteButton} onClick={handleDelete}>
        <CloseIcon />
      </div>
    </div>
  );
}

export default React.memo(withStyles(styles)(SongListItem));
