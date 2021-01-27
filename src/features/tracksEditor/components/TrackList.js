import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';
import AddTrackButton from './AddTrackButton';
import Ruler from './Ruler';
import Track from './Track';

const { Box, Fade, LoadingIndicator, Stack } = shared.components;

TrackList.propTypes = {
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
  const theme = useTheme();

  return (
    <Box
      sx={{
        alignItems: 'flex-start',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <Fade in={isLoading}>
        <LoadingIndicator>LOADING SONG...</LoadingIndicator>
      </Fade>
      <Fade in={!isLoading}>
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            flex: '1 0 auto',
            flexDirection: 'column',
            minWidth: '100%',
            padding: 4,
            paddingBottom: (theme) => theme.spacing(4) + 64,
            paddingRight: (theme) => theme.spacing(4) + 128,
            paddingTop: 4,
            position: 'relative',
          }}
        >
          <Box
            onClick={onSequenceDeselect}
            sx={{ ...theme.mixins.absoluteFill }}
          />

          <Stack space={6}>
            <Ruler
              measureCount={songMeasureCount}
              measureWidth={64}
              onMeasureCountChange={onSongMeasureCountChange}
              onPositionSet={onPositionSet}
            />
            {tracks.map((track) => (
              <Track
                key={track.id}
                onSequenceAdd={onSequenceAdd}
                onSequenceEdit={onSequenceEdit}
                onSequenceOpen={onSequenceOpen}
                onSequenceSelect={onSequenceSelect}
                onTrackSelect={onTrackStage}
                selectedSequenceId={selectedSequence.id}
                songMeasureCount={songMeasureCount}
                track={track}
              />
            ))}
            <AddTrackButton onClick={onTrackAdd} />
          </Stack>
        </Box>
      </Fade>
    </Box>
  );
}

export default React.memo(TrackList);
