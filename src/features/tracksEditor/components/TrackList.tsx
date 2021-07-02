import { Box, Stack, useThemeWithDefault } from 'aria-ui';
import { MouseEventHandler } from 'react';
import { forwardRef, memo } from 'react';

import { Sequence, Track } from '../../../types';
import { AddTrackButton } from './AddTrackButton';
import { Ruler } from './Ruler';
import { TrackListTrack } from './TrackListTrack';

export interface TrackListProps {
  onPositionSet: (changedPosition: number) => void;
  onSequenceAdd: (options: { position: number; track: Track }) => void;
  onSequenceDeselect: MouseEventHandler<HTMLElement>;
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

export const TrackList = memo(
  forwardRef<HTMLDivElement, TrackListProps>((props, ref) => {
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
    const theme = useThemeWithDefault();

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
            padding: theme.space(4),
            paddingBottom: (theme.space(4) as number) + 64,
            paddingRight: (theme.space(4) as number) + 128,
            position: 'relative',
          }}
        >
          <Box
            onClick={onSequenceDeselect}
            sx={{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }}
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
  }),
);
