import getOr from 'lodash/fp/getOr';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.contrastText,
    height: 1,
    left: 0,
    position: 'absolute',
    top: 0,
  },
});

TrackSequenceNote.propTypes = {
  classes: PropTypes.object,
  note: PropTypes.object,
};

function TrackSequenceNote(props) {
  const x0 = getOr(0, 'note.points[0].x', props);
  const x1 = getOr(0, 'note.points[1].x', props);
  const y0 = getOr(0, 'note.points[0].y', props);

  return (
    <div
      className={props.classes.root}
      style={{
        transform: `translate(${x0 * 2}px, ${y0}px)`,
        width: (x1 - x0 + 1) * 2,
      }}
    />
  );
}

export default React.memo(withStyles(styles)(TrackSequenceNote));
