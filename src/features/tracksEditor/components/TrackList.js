import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { animated, useTransition } from 'react-spring';
import shared from '../../shared';
import Ruler from './Ruler';
import Track from './Track';

const { FadeIn, FadeOut, LoadingIndicator } = shared.components;

const styles = theme => ({
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
  const trackTransitions = useTransition(tracks, track => track.id, {
    config: { clamp: true, tension: 200 },
    from: { marginLeft: -64, opacity: 0 },
    enter: { marginLeft: 0, opacity: 1 },
    leave: { marginLeft: 64, opacity: 0 },
  });

  return (
    <div className={classes.root}>
      <FadeOut isVisible={isLoading}>
        <LoadingIndicator>LOADING SONG...</LoadingIndicator>
      </FadeOut>
      <div className={classes.content}>
        <div className={classes.underlay} onClick={onSequenceDeselect} />
        <FadeIn isVisible={!isLoading}>
          <Ruler
            measureCount={songMeasureCount}
            measureWidth={64}
            onMeasureCountChange={onSongMeasureCountChange}
            onPositionSet={onPositionSet}
          />
          {trackTransitions.map(({ item, key, props: animation }) => (
            <animated.div
              key={key}
              style={{
                ...animation,
              }}
            >
              <Track
                onSequenceAdd={onSequenceAdd}
                onSequenceEdit={onSequenceEdit}
                onSequenceOpen={onSequenceOpen}
                onSequenceSelect={onSequenceSelect}
                onTrackSelect={onTrackStage}
                selectedSequenceId={selectedSequence.id}
                songMeasureCount={songMeasureCount}
                track={item}
              />
            </animated.div>
          ))}
          <Fab
            className={classes.addTrackButton}
            onClick={onTrackAdd}
            variant="extended"
          >
            <AddIcon className={classes.addTrackButtonIcon} />
            Add Track
          </Fab>
        </FadeIn>
      </div>
    </div>
  );
}

export default React.memo(withStyles(styles)(TrackList));
