import getOr from 'lodash/fp/getOr';
import PropTypes from 'prop-types';
import React from 'react';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components/macro';
import shared from '../../shared';
import AddTrackButton from './AddTrackButton';
import Ruler from './Ruler';
import Track from './Track';

const { FadeIn, FadeOut } = shared.components;

const LoadingIndicator = styled(animated.div)({
  alignItems: 'center',
  bottom: 0,
  color: 'white',
  display: 'flex',
  flex: '1 1 auto',
  justifyContent: 'center',
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
});

const StyledTrackList = styled('div')({
  alignItems: 'flex-start',
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  overflow: 'auto',
  position: 'relative',
});

const TrackListContent = styled('div')(props => ({
  alignItems: 'flex-start',
  display: 'flex',
  flex: '1 0 auto',
  flexDirection: 'column',
  minWidth: '100%',
  padding: props.theme.margin.m,
  paddingBottom: props.theme.margin.m + 84,
  paddingRight: props.theme.margin.m + 128,
  paddingTop: props.theme.margin.m + 2,
  position: 'relative',
}));

const TrackListUnderlay = styled('div')({
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
});

TrackList.propTypes = {
  onPositionSet: PropTypes.func,
  onSequenceAdd: PropTypes.func,
  onSequenceDeselect: PropTypes.func,
  onSequenceEdit: PropTypes.func,
  onSequenceOpen: PropTypes.func,
  onSequenceSelect: PropTypes.func,
  onSongMeasureCountChange: PropTypes.func,
  onTrackAdd: PropTypes.func,
  onTrackIsMutedToggle: PropTypes.func,
  onTrackIsSoloingToggle: PropTypes.func,
  onTrackStage: PropTypes.func,
  selectedSequence: PropTypes.object,
  songMeasureCount: PropTypes.number,
  tracks: PropTypes.arrayOf(PropTypes.object),
};

export default React.memo(TrackList);

function TrackList(props) {
  const trackTransitions = useTransition(props.tracks, track => track.id, {
    config: {
      clamp: true,
      tension: 200,
    },
    from: {
      marginLeft: -64,
      opacity: 0,
    },
    enter: {
      marginLeft: 0,
      opacity: 1,
    },
    leave: {
      marginLeft: 64,
      opacity: 0,
    },
  });

  return (
    <StyledTrackList>
      <FadeOut component={LoadingIndicator} isVisible={props.isLoading}>
        LOADING SONG...
      </FadeOut>
      <TrackListContent>
        <TrackListUnderlay onClick={props.onSequenceDeselect} />
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
                  output: [0, 136, 136],
                }),
              }}
            >
              <Track
                onSequenceAdd={props.onSequenceAdd}
                onSequenceEdit={props.onSequenceEdit}
                onSequenceOpen={props.onSequenceOpen}
                onSequenceSelect={props.onSequenceSelect}
                onTrackIsMutedToggle={props.onTrackIsMutedToggle}
                onTrackIsSoloingToggle={props.onTrackIsSoloingToggle}
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
          <AddTrackButton
            onClick={props.onTrackAdd}
            songMeasureCount={props.songMeasureCount}
          />
        </FadeIn>
      </TrackListContent>
    </StyledTrackList>
  );
}
