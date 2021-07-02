import { Box, Stack } from 'aria-ui';
import { AnimatePresence, motion } from 'framer-motion';
import each from 'lodash/fp/each';
import find from 'lodash/fp/find';
import inRange from 'lodash/fp/inRange';
import isNil from 'lodash/fp/isNil';
import range from 'lodash/fp/range';
import some from 'lodash/fp/some';
import { FC, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Sequence, Track } from '../../../types';
import { GridBoxes } from '../../shared';
import { AddSequenceButton } from './AddSequenceButton';
import { TrackHeader } from './TrackHeader';
import { TrackListSequence } from './TrackListSequence';

export interface TrackListTrackProps {
  onSequenceAdd: (options: { position: number; track: Track }) => void;
  onSequenceEdit: (editedSequence: Sequence) => void;
  onSequenceOpen: (sequenceToOpen: Sequence) => void;
  onSequenceSelect: (sequenceToSelect: Sequence) => void;
  onTrackSelect: (trackToSelect: Track) => void;
  selectedSequenceId?: number;
  songMeasureCount: number;
  track: Track;
}

export const TrackListTrack: FC<TrackListTrackProps> = memo((props) => {
  const {
    onSequenceAdd,
    onSequenceEdit,
    onSequenceOpen,
    onSequenceSelect,
    onTrackSelect,
    selectedSequenceId,
    songMeasureCount,
    track,
  } = props;
  const { t } = useTranslation();

  const boxesItems = useMemo(() => {
    return track.sequences.map((sequence) => ({
      id: sequence.id,
      length: sequence.measureCount,
      x: sequence.position,
      sequence,
    }));
  }, [track.sequences]);

  const firstEmptyPosition = useMemo(() => {
    const allPositions = range(0, songMeasureCount);
    const sequenceCoversPosition = (position) => (sequence) =>
      inRange(
        sequence.position,
        sequence.position + sequence.measureCount,
        position,
      );
    const isEmptyPosition = (position) =>
      !some(sequenceCoversPosition(position), track.sequences);

    return find(isEmptyPosition, allPositions);
  }, [songMeasureCount, track.sequences]);

  const getIsSequenceSelected = useCallback(
    (sequence) => {
      if (!selectedSequenceId) return false;

      return sequence.id === selectedSequenceId;
    },
    [selectedSequenceId],
  );

  const handleGridBoxesItemsChange = useCallback(
    (items) => {
      const editedSequences = items
        .filter((item) => {
          if (item.sequence.measureCount !== item.length) return true;

          if (item.sequence.position !== item.x) return true;

          return false;
        })
        .map((item) => ({
          ...item.sequence,
          measureCount: item.length,
          position: item.x,
        }));

      each(onSequenceEdit, editedSequences);
    },
    [onSequenceEdit],
  );

  const handleHeaderClick = useCallback(() => {
    onTrackSelect(track);
  }, [onTrackSelect, track]);

  const handleSequenceAdd = useCallback(
    (position) => {
      onSequenceAdd({
        position,
        track,
      });
    },
    [onSequenceAdd, track],
  );

  const sequenceComponent = useCallback(
    ({ isDragging, item }) => (
      <TrackListSequence
        isDragging={isDragging}
        isSelected={getIsSequenceSelected(item.sequence)}
        onOpen={onSequenceOpen}
        onSelect={onSequenceSelect}
        sequence={item.sequence}
      />
    ),
    [getIsSequenceSelected, onSequenceOpen, onSequenceSelect],
  );

  return (
    <Stack space={2}>
      <TrackHeader onClick={handleHeaderClick}>
        {t(track.voice.name)}
      </TrackHeader>
      <Box
        backgroundColor="backgroundContrast"
        borderRadius="md"
        padding={0.5}
        style={{ width: songMeasureCount * 64 + 4 }}
        sx={{
          alignItems: 'stretch',
          display: 'flex',
          flex: '1 0 auto',
          position: 'relative',
          transition: 'width 500ms ease',
          zIndex: 0,
        }}
      >
        <GridBoxes
          boxContentComponent={sequenceComponent}
          items={boxesItems}
          length={songMeasureCount}
          onItemsChange={handleGridBoxesItemsChange}
          step={64}
          style={{ height: 64 }}
        />
        <AnimatePresence>
          {!isNil(firstEmptyPosition) && (
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AddSequenceButton
                onClick={handleSequenceAdd}
                position={firstEmptyPosition}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Stack>
  );
});
