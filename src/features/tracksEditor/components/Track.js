import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import { AnimatePresence, motion } from 'framer-motion';
import each from 'lodash/fp/each';
import find from 'lodash/fp/find';
import inRange from 'lodash/fp/inRange';
import isNil from 'lodash/fp/isNil';
import range from 'lodash/fp/range';
import some from 'lodash/fp/some';
import React from 'react';
import { Translation } from 'react-i18next';
import { showIf } from 'react-render-helpers';

import shared from '../../shared';
import AddSequenceButton from './AddSequenceButton';
import TrackHeader from './TrackHeader';
import TrackSequence from './TrackSequence';

const { Boxes } = shared.components;

const styles = (theme) =>
  createStyles({
    root: {
      alignItems: 'stretch',
      display: 'flex',
      flex: '0 0 auto',
      flexDirection: 'column',
      marginBottom: theme.spacing(3),
    },
    sequences: {
      alignItems: 'stretch',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid transparent',
      boxShadow: `0 0 0 2px ${theme.palette.action.hover}`,
      borderRadius: theme.shape.borderRadius * 2,
      display: 'flex',
      flex: '1 0 auto',
      position: 'relative',
      transition: 'width 500ms ease',
    },
  });

// export interface TrackProps extends WithStyles<typeof styles> {
//   onSequenceAdd?: (track: TrackWithSequences, position: number) => void;
//   onSequenceEdit?: (sequence: SequenceWithNotes) => void;
//   onSequenceOpen?: (sequence: SequenceWithNotes) => void;
//   onSequenceSelect?: (sequence: SequenceWithNotes) => void;
//   onTrackSelect?: (track: TrackWithSequences) => void;
//   selectedSequenceId?: string;
//   songMeasureCount?: number;
//   theme?;
//   track?: TrackWithSequences;
// }

function Track(props) {
  const {
    classes,
    onSequenceAdd,
    onSequenceEdit,
    onSequenceOpen,
    onSequenceSelect,
    onTrackSelect,
    selectedSequenceId,
    songMeasureCount,
    track,
  } = props;

  const boxesItems = React.useMemo(() => {
    return track.sequences.map((sequence) => ({
      id: sequence.id,
      length: sequence.measureCount,
      x: sequence.position,
      sequence,
    }));
  }, [track.sequences]);

  const firstEmptyPosition = React.useMemo(() => {
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

  const getIsSequenceSelected = React.useCallback(
    (sequence) => {
      if (!selectedSequenceId) return false;

      return sequence.id === selectedSequenceId;
    },
    [selectedSequenceId],
  );

  const handleBoxesItemsChange = React.useCallback(
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

  const handleHeaderClick = React.useCallback(() => {
    onTrackSelect(track);
  }, [onTrackSelect, track]);

  const handleSequenceAdd = React.useCallback(
    (position) => {
      onSequenceAdd(track, position);
    },
    [onSequenceAdd, track],
  );

  const sequenceComponent = React.useCallback(
    ({ isDragging, item }) => (
      <TrackSequence
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
    <div className={classes.root}>
      <Translation>
        {(t) => (
          <TrackHeader onClick={handleHeaderClick}>
            {t(track.voice)}
          </TrackHeader>
        )}
      </Translation>
      <div
        className={classes.sequences}
        style={{ width: songMeasureCount * 64 + 4 }}
      >
        <Boxes
          boxContentComponent={sequenceComponent}
          items={boxesItems}
          length={songMeasureCount}
          onItemsChange={handleBoxesItemsChange}
          step={64}
          style={{ height: 64 }}
        />
        <AnimatePresence>
          {showIf(!isNil(firstEmptyPosition))(() => (
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
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default React.memo(withStyles(styles)(Track));
