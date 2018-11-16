import each from 'lodash/fp/each';
import find from 'lodash/fp/find';
import getOr from 'lodash/fp/getOr';
import inRange from 'lodash/fp/inRange';
import isNil from 'lodash/fp/isNil';
import range from 'lodash/fp/range';
import some from 'lodash/fp/some';
import times from 'lodash/fp/times';
import PropTypes from 'prop-types';
import React from 'react';
import { showIf } from 'react-render-helpers';
import * as palette from '../../../../styles/palette';
import shared from '../../../shared';
import { AddSequenceButton } from '../AddSequenceButton/AddSequenceButton';
import { TrackSequence } from '../TrackSequence/TrackSequence';
import { TrackHeader } from '../TrackHeader/TrackHeader';
import './Track.scss';

const { Boxes, MatrixBox } = shared.components;

export class Track extends React.PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    onSequenceAdd: PropTypes.func.isRequired,
    onSequenceEdit: PropTypes.func,
    onSequenceOpen: PropTypes.func.isRequired,
    onSequenceSelect: PropTypes.func.isRequired,
    onTrackIsMutedToggle: PropTypes.func.isRequired,
    onTrackIsSoloingToggle: PropTypes.func.isRequired,
    onTrackSelect: PropTypes.func.isRequired,
    selectedSequence: PropTypes.object,
    songMeasureCount: PropTypes.number.isRequired,
    track: PropTypes.object.isRequired,
  }

  render() {
    const firstEmptyPosition = this.getFirstEmptyPosition();
    return (
      <div
        className="track">
        <TrackHeader
          isMuted={getOr(false, 'props.track.isMuted', this)}
          isSoloing={getOr(false, 'props.track.isSoloing', this)}
          onClick={this.handleHeaderClick}
          onIsMutedToggle={this.handleHeaderIsMutedToggle}
          onIsSoloingToggle={this.handleHeaderIsSoloingToggle}
          track={this.props.track}
        />
        <div
          className="track__sequences"
          style={this.getBodySequencesStyle()}>
          {false && <MatrixBox
            fill={palette.emerald[2]}
            matrix={this.getMatrix()}
            height={84}
            width={this.props.songMeasureCount * 64}
            style={{
              left: 0,
              position: 'absolute',
              top: 0,
            }}
          />}
          <Boxes
            boxContentComponent={this.getSequenceComponent}
            items={this.getBoxesItems()}
            length={this.props.songMeasureCount}
            onItemsChange={this.handleBoxesItemsChange}
            step={64}
            style={{
              height: 84,
            }}
          />
          {showIf(!isNil(firstEmptyPosition))(
            <AddSequenceButton
              onClick={() => this.handleSequenceAdd(firstEmptyPosition)}
              style={{
                left: firstEmptyPosition * 64,
              }}
            />
          )}
        </div>
      </div>
    );
  }

  getBodySequencesStyle = () => ({
    width: this.props.songMeasureCount * 64,
  });

  getBoxesItems = () => {
    const sequences = getOr([], 'props.track.sequences', this);

    return sequences.map(sequence => ({
      id: sequence.id,
      length: sequence.measureCount,
      x: sequence.position,
      sequence,
    }));
  };

  getFirstEmptyPosition = () => {
    const sequences = getOr([], 'props.track.sequences', this);
    const allPositions = range(0, this.props.songMeasureCount);
    const sequenceCoversPosition = position => sequence =>
      inRange(
        sequence.position,
        sequence.position + (sequence.measureCount),
        position,
      );
    const isEmptyPosition = position =>
      !some(sequenceCoversPosition(position), sequences);

    return find(isEmptyPosition, allPositions);
  };

  getIsSequenceSelected = (sequence) => {
    const sequenceId = getOr('', 'id', sequence);
    const selectedSequenceId = getOr('', 'props.selectedSequence.id', this);

    if (!selectedSequenceId) return false;

    return sequenceId === selectedSequenceId;
  }


  getMatrix = () => {
    const rowCount = 7;
    const columnCount = (4 * this.props.songMeasureCount) + 1;

    return times(
      row => times(
        (column) => {
          if (column === 0 || column % 4 === 0) {
            if (row === 0 || row === 3 || row === 6) {
              return 2;
            }
          }
          return 1;
        },
        columnCount,
      ),
      rowCount,
    );
  };

  getSequenceComponent = ({ item }) => (
    <TrackSequence
      isSelected={this.getIsSequenceSelected(item.sequence)}
      onOpen={this.props.onSequenceOpen}
      onSelect={this.props.onSequenceSelect}
      sequence={item.sequence}
    />
  );

  handleBodySequencesSequenceOpen = (sequence) => {
    this.props.onSequenceOpen(sequence);
  }

  handleBodySequencesSequenceSelect = (sequence) => {
    this.props.onSequenceSelect(sequence);
  }

  handleBoxesItemsChange = (items) => {
    const editedSequences = items.filter((item) => {
      if (item.sequence.measureCount !== item.length) return true;

      if (item.sequence.position !== item.x) return true;

      return false;
    }).map(item => ({
      ...item.sequence,
      measureCount: item.length,
      position: item.x,
    }));

    each(this.props.onSequenceEdit, editedSequences);
  };

  handleHeaderClick = () => {
    this.props.onTrackSelect(this.props.track);
  }

  handleHeaderIsMutedToggle = () => {
    this.props.onTrackIsMutedToggle(this.props.track);
  }

  handleHeaderIsSoloingToggle = () => {
    this.props.onTrackIsSoloingToggle(this.props.track);
  }

  handleSequenceAdd = (position) => {
    this.props.onSequenceAdd(
      this.props.track,
      position,
    );
  }
}
