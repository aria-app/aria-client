import { AnimatePresence, motion } from 'framer-motion';
import orderBy from 'lodash/fp/orderBy';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import SongListItem from './SongListItem';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
  });

interface Song {
  [key: string]: any;
}

export interface SongListProps extends WithStyles<typeof styles> {
  onDelete?: (song: Song) => void;
  onOpen?: (song: Song) => void;
  songs?: Array<Song>;
}

function SongList(props: SongListProps) {
  const { classes, onDelete, onOpen, songs } = props;

  const sortedSongs = React.useMemo(
    () => orderBy(x => x.dateModified, 'desc', Object.values(songs)),
    [songs],
  );

  return (
    <div className={classes.root}>
      <AnimatePresence>
        {sortedSongs.map(song => (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key={song.id}
          >
            <SongListItem onDelete={onDelete} onOpen={onOpen} song={song} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default React.memo(withStyles(styles)(SongList));
