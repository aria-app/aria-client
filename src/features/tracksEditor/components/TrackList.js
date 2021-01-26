import { useTheme } from '@emotion/react';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';
import Ruler from './Ruler';
import Track from './Track';

const { Button, LoadingIndicator, Stack } = shared.components;

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
      <Fade in={isLoading} mountOnEnter unmountOnExit>
        <LoadingIndicator>LOADING SONG...</LoadingIndicator>
      </Fade>
      <Fade in={!isLoading} mountOnEnter unmountOnExit>
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
          <Stack space={8}>
            <Ruler
              measureCount={songMeasureCount}
              measureWidth={64}
              onMeasureCountChange={onSongMeasureCountChange}
              onPositionSet={onPositionSet}
            />
            <Stack
              className="stakk"
              componentProps={{
                item: {
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  initial: { opacity: 0 },
                },
              }}
              isAnimated
              space={6}
            >
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
            </Stack>
            <Button
              onClick={onTrackAdd}
              startIcon={<AddIcon />}
              variant="outlined"
            >
              Add Track
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Box>
  );
}

export default React.memo(TrackList);
