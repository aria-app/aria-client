import { useTheme } from '@emotion/react';
import { forwardRef, memo } from 'react';

import { Sequence, Track } from '../../../types';
import { Box, Stack } from '../../shared';
import AddTrackButton from './AddTrackButton';
import Ruler from './Ruler';
import TrackListTrack from './TrackListTrack';

export interface TrackListProps {
  onPositionSet: (changedPosition: number) => void;
  onSequenceAdd: (options: { position: number; track: Track }) => void;
  onSequenceDeselect: (sequenceToDeselect: Sequence) => void;
  onSequenceEdit: (editedSequence: Sequence) => void;
  onSequenceOpen: (sequenceToOpen: Sequence) => void;
  onSequenceSelect: (sequenceToSelect: Sequence) => void;
  onSongMeasureCountChange: (changedMeasureCount: number) => void;
  onTrackAdd: () => void;
  onTrackStage: (trackToStage: Track) => void;
  selectedSequence?: Sequence;
  songMeasureCount: number;
  tracks: Track[];
}

const TrackList = forwardRef<HTMLDivElement, TrackListProps>((props, ref) => {
  const {
    onPositionSet,
    onSequenceAdd,
    onSequenceDeselect,
    onSequenceEdit,
    onSequenceOpen,
    onSequenceSelect,
    onSongMeasureCountChange,
    onTrackAdd,
    onTrackStage,
    selectedSequence,
    songMeasureCount,
    tracks,
  } = props;
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      sx={{
        alignItems: 'flex-start',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'auto',
        position: 'relative',
      }}
    >
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
            <TrackListTrack
              key={track.id}
              onSequenceAdd={onSequenceAdd}
              onSequenceEdit={onSequenceEdit}
              onSequenceOpen={onSequenceOpen}
              onSequenceSelect={onSequenceSelect}
              onTrackSelect={onTrackStage}
              selectedSequenceId={selectedSequence?.id}
              songMeasureCount={songMeasureCount}
              track={track}
            />
          ))}
          <AddTrackButton onClick={onTrackAdd} />
        </Stack>
      </Box>
    </Box>
  );
});

export default memo(TrackList);
