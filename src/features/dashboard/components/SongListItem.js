import CloseIcon from '@material-ui/icons/Close';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme =>
  createStyles({
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
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      height: 40,
      marginRight: theme.spacing(-1),
      width: 40,
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
      <div className={classes.deleteButton} onClick={handleDelete}>
        <CloseIcon fontSize="small" />
      </div>
    </div>
  );
}

SongListItem.propTypes = {
  onDelete: PropTypes.func,
  onOpen: PropTypes.func,
  song: PropTypes.object,
};

export default React.memo(withStyles(styles)(SongListItem));
