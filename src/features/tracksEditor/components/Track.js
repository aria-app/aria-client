import each from 'lodash/fp/each';
import find from 'lodash/fp/find';
import inRange from 'lodash/fp/inRange';
import isNil from 'lodash/fp/isNil';
import range from 'lodash/fp/range';
import some from 'lodash/fp/some';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { Translation } from 'react-i18next';
import { showIf } from 'react-render-helpers';
import shared from '../../shared';
import AddSequenceButton from './AddSequenceButton';
import TrackSequence from './TrackSequence';
import TrackHeader from './TrackHeader';

const { Boxes } = shared.components;

const styles = theme => ({
  root: {
    alignItems: 'stretch',
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'column',
    marginBottom: theme.spacing(3),
  },
  matrixBox: {
    left: 0,
    position: 'absolute',
    top: 0,
  },
  sequences: {
    alignItems: 'stretch',
    backgroundColor: theme.palette.action.hover,
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flex: '1 0 auto',
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
        <Boxes
          boxContentComponent={sequenceComponent}
          className={classes.boxes}
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

export default React.memo(withStyles(styles)(Track));
