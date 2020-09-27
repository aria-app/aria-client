import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/styles/withStyles';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';
import Ruler from './Ruler';
import Track from './Track';

const { LoadingIndicator } = shared.components;

const styles = (theme) => ({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    overflow: 'auto',
    position: 'relative',
  },
  content: {
    alignItems: 'flex-start',
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    minWidth: '100%',
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(2) + 64,
    paddingRight: theme.spacing(2) + 128,
    paddingTop: theme.spacing(2),
    position: 'relative',
  },
  underlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  addTrackButton: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'none',
    color: theme.palette.text.hint,
    fontWeight: 600,
    height: 40,
    lineHeight: 'inherit',
    paddingLeft: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.text.secondary,
      color: theme.palette.text.secondary,
    },
  },
  addTrackButtonIcon: {
    fill: theme.palette.text.hint,
    marginRight: theme.spacing(1),
    '$addTrackButton:hover &': {
      fill: theme.palette.text.secondary,
    },
  },
});

TrackList.propTypes = {
  classes: PropTypes.object,
  isLoading: PropTypes.bool,
  onPositionSet: PropTypes.func,
  onSequenceAdd: PropTypes.func,
  onSequenceDeselect: PropTypes.func,
  onSequenceEdit: PropTypes.func,
  onSequenceOpen: PropTypes.func,
  onSequenceSelect: PropTypes.func,
  onSongMeasureCountChange: PropTypes.func,
  onTrackAdd: PropTypes.func,
  onTrackStage: PropTypes.func,
  selectedSequence: PropTypes.object,
  songMeasureCount: PropTypes.number,
  tracks: PropTypes.arrayOf(PropTypes.object),
};

function TrackList(props) {
  const {
    classes,
    isLoading,
    onPositionSet,
    onSequenceAdd,
    onSequenceDeselect,
    onSequenceEdit,
    onSequenceOpen,
    onSequenceSelect,
    onSongMeasureCountChange,
    onTrackAdd,
    onTrackStage,
    selectedSequence = {},
    songMeasureCount,
    tracks,
  } = props;

  return (
    <div className={classes.root}>
      <Fade in={isLoading} mountOnEnter unmountOnExit>
        <LoadingIndicator>LOADING SONG...</LoadingIndicator>
      </Fade>
      <Fade in={!isLoading} mountOnEnter unmountOnExit>
        <div className={classes.content}>
          <div className={classes.underlay} onClick={onSequenceDeselect} />
          <Ruler
            measureCount={songMeasureCount}
            measureWidth={64}
            onMeasureCountChange={onSongMeasureCountChange}
            onPositionSet={onPositionSet}
          />
          <AnimatePresence>
            {tracks.map((track) => (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={track.id}
              >
                <Track
                  onSequenceAdd={onSequenceAdd}
                  onSequenceEdit={onSequenceEdit}
                  onSequenceOpen={onSequenceOpen}
                  onSequenceSelect={onSequenceSelect}
                  onTrackSelect={onTrackStage}
                  selectedSequenceId={selectedSequence.id}
                  songMeasureCount={songMeasureCount}
                  track={track}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <Fab
            className={classes.addTrackButton}
            onClick={onTrackAdd}
            variant="extended"
          >
            <AddIcon className={classes.addTrackButtonIcon} />
            Add Track
          </Fab>
        </div>
      </Fade>
    </div>
  );
}

export default React.memo(withStyles(styles)(TrackList));
