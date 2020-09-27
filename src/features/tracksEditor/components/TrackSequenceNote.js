import classnames from 'classnames';
import getOr from 'lodash/fp/getOr';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import React from 'react';

const styles = theme =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
      height: 1,
      left: 2,
      position: 'absolute',
      top: 2,
    },
    selectedSequence: {
      backgroundColor: theme.palette.primary.contrastText,
    },
  });

// export interface TrackSequenceNoteProps extends WithStyles<typeof styles> {
//   isSequenceSelected?: boolean;
//   note?: Note;
// }

function TrackSequenceNote(props) {
  const { classes, isSequenceSelected, note } = props;
  const x0 = getOr(0, 'points[0].x', note);
  const x1 = getOr(0, 'points[1].x', note);
  const y0 = getOr(0, 'points[0].y', note) * (64 / 84);

  return (
    <div
      className={classnames(classes.root, {
        [classes.selectedSequence]: isSequenceSelected,
      })}
      style={{
        transform: `translate(${x0 * 2}px, ${y0}px)`,
        width: (x1 - x0 + 1) * 2,
      }}
    />
  );
}

export default React.memo(withStyles(styles)(TrackSequenceNote));
