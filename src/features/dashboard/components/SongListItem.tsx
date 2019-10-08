import CloseIcon from '@material-ui/icons/Close';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';

const styles = (theme: Theme) =>
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

interface Song {
  [key: string]: any;
}

export interface SongListItemProps extends WithStyles<typeof styles> {
  onDelete?: (song: Song) => void;
  onOpen?: (song: Song) => void;
  song?: Song;
}

function SongListItem(props: SongListItemProps) {
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

export default React.memo(withStyles(styles)(SongListItem));
