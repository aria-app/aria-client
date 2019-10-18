import CloseIcon from '@material-ui/icons/Close';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import { Song } from '../../shared/types';

const styles = (theme: Theme) =>
  createStyles({
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
        <CloseIcon />
      </div>
    </div>
  );
}

export default React.memo(withStyles(styles)(SongListItem));
