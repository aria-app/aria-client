import each from 'lodash/fp/each';
import find from 'lodash/fp/find';
import inRange from 'lodash/fp/inRange';
import isNil from 'lodash/fp/isNil';
import range from 'lodash/fp/range';
import some from 'lodash/fp/some';
import times from 'lodash/fp/times';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';
import { showIf } from 'react-render-helpers';
import withTheme from '@material-ui/styles/withTheme';
import shared from '../../shared';
import AddSequenceButton from './AddSequenceButton';
import TrackSequence from './TrackSequence';
import TrackHeader from './TrackHeader';

const { Boxes, MatrixBox } = shared.components;

const styles = theme => ({
  root: {
    alignItems: 'stretch',
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  matrixBox: {
    left: 0,
    position: 'absolute',
    top: 0,
  },
  sequences: {
    alignItems: 'stretch',
    display: 'flex',
    flex: '1 0 auto',
    height: 84,
    position: 'relative',
  },
});

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
    theme,
    track,
  } = props;

  const boxesItems = React.useMemo(() => {
    return track.sequences.map(sequence => ({
      id: sequence.id,
      length: sequence.measureCount,
      x: sequence.position,
      sequence,
    }));
  }, [track.sequences]);

  const firstEmptyPosition = React.useMemo(() => {
    const allPositions = range(0, songMeasureCount);
    const sequenceCoversPosition = position => sequence =>
      inRange(
        sequence.position,
        sequence.position + sequence.measureCount,
        position,
      );
    const isEmptyPosition = position =>
      !some(sequenceCoversPosition(position), track.sequences);

    return find(isEmptyPosition, allPositions);
  }, [songMeasureCount, track.sequences]);

  const matrix = React.useMemo(() => {
    const rowCount = 7;
    const columnCount = 4 * songMeasureCount + 1;

    return times(
      row =>
        times(column => {
          if (column === 0 || column % 4 === 0) {
            if (row === 0 || row === 3 || row === 6) {
              return 2;
            }
          }
          return 1;
        }, columnCount),
      rowCount,
    );
  }, [songMeasureCount]);

  const getIsSequenceSelected = React.useCallback(
    sequence => {
      if (!selectedSequenceId) return false;

      return sequence.id === selectedSequenceId;
    },
    [selectedSequenceId],
  );

  const handleBoxesItemsChange = React.useCallback(
    items => {
      const editedSequences = items
        .filter(item => {
          if (item.sequence.measureCount !== item.length) return true;

          if (item.sequence.position !== item.x) return true;

          return false;
        })
        .map(item => ({
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
    position => {
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
        {t => (
          <TrackHeader onClick={handleHeaderClick}>
            {t(track.voice)}
          </TrackHeader>
        )}
      </Translation>
      <div
        className={classes.sequences}
        style={{ width: songMeasureCount * 64 }}
      >
        <MatrixBox
          className={classes.matrixBox}
          fill={theme.palette.primary.main}
          matrix={matrix}
          height={84}
          width={songMeasureCount * 64}
        />
        <Boxes
          boxContentComponent={sequenceComponent}
          items={boxesItems}
          length={songMeasureCount}
          onItemsChange={handleBoxesItemsChange}
          step={64}
          style={{ height: 84 }}
        />
        {showIf(!isNil(firstEmptyPosition))(
          <AddSequenceButton
            onClick={handleSequenceAdd}
            position={firstEmptyPosition}
          />,
        )}
      </div>
    </div>
  );
}

Track.propTypes = {
  classes: PropTypes.object,
  onSequenceAdd: PropTypes.func,
  onSequenceEdit: PropTypes.func,
  onSequenceOpen: PropTypes.func,
  onSequenceSelect: PropTypes.func,
  onTrackIsMutedToggle: PropTypes.func,
  onTrackIsSoloingToggle: PropTypes.func,
  onTrackSelect: PropTypes.func,
  selectedSequenceId: PropTypes.string,
  songMeasureCount: PropTypes.number,
  theme: PropTypes.object,
  track: PropTypes.object,
};

export default React.memo(withTheme(withStyles(styles)(Track)));
