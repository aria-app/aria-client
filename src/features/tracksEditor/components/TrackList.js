import getOr from 'lodash/fp/getOr';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { animated, useTransition } from 'react-spring';
import shared from '../../shared';
import Ruler from './Ruler';
import Track from './Track';
import { classes } from 'istanbul-lib-coverage';

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
    paddingBottom: theme.spacing(2) + 84,
    paddingRight: theme.spacing(2) + 128,
    paddingTop: theme.spacing(2) + 2,
    position: 'relative',
  },
  underlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  addTrackButtonIcon: {
    marginRight: theme.spacing(1),
  },
});

TrackList.propTypes = {
  classes: PropTypes.object,
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
  const trackTransitions = useTransition(props.tracks, track => track.id, {
    config: { clamp: true, tension: 200 },
    from: { marginLeft: -64, opacity: 0 },
    enter: { marginLeft: 0, opacity: 1 },
    leave: { marginLeft: 64, opacity: 0 },
  });

  return (
    <div className={props.classes.root}>
      <FadeOut isVisible={props.isLoading}>
        <LoadingIndicator>LOADING SONG...</LoadingIndicator>
      </FadeOut>
      <div className={props.classes.content}>
        <div
          className={props.classes.underlay}
          onClick={props.onSequenceDeselect}
        />
        <FadeIn isVisible={!props.isLoading}>
          <Ruler
            measureCount={props.songMeasureCount}
            measureWidth={64}
            onMeasureCountChange={props.onSongMeasureCountChange}
            onPositionSet={props.onPositionSet}
          />
          {trackTransitions.map(({ item, key, props: animation }) => (
            <animated.div
              key={key}
              style={{
                ...animation,
                height: animation.opacity.interpolate({
                  range: [0, 0.5, 1],
                  output: [0, 144, 144],
                }),
              }}
            >
              <Track
                onSequenceAdd={props.onSequenceAdd}
                onSequenceEdit={props.onSequenceEdit}
                onSequenceOpen={props.onSequenceOpen}
                onSequenceSelect={props.onSequenceSelect}
                onTrackSelect={props.onTrackStage}
                selectedSequenceId={getOr(
                  undefined,
                  'selectedSequence.id',
                  props,
                )}
                songMeasureCount={props.songMeasureCount}
                track={item}
              />
            </animated.div>
          ))}
          <Fab
            className={classes.addTrackButton}
            color="primary"
            onClick={props.onTrackAdd}
            variant="extended"
          >
            <AddIcon
              className={classes.addTrackButtonIcon}
              style={{ marginRight: 8 }}
            />
            Add Track
          </Fab>
        </FadeIn>
      </div>
    </div>
  );
}

export default React.memo(withStyles(styles)(TrackList));
