import getOr from 'lodash/fp/getOr';
import times from 'lodash/fp/times';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { SortableElement } from 'react-sortable-hoc';
import * as palette from '../../../../styles/palette';
import shared from '../../../shared';
// import { AddSequenceButton } from '../AddSequenceButton/AddSequenceButton';
import { TrackSequence } from '../TrackSequence/TrackSequence';
import { TrackHeader } from '../TrackHeader/TrackHeader';
import './Track.scss';

const { MatrixBox } = shared.components;

export class Track extends React.PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    onSequenceAdd: PropTypes.func.isRequired,
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
    return h(SortableElement(() =>
      h('.track', [
        h(TrackHeader, {
          isMuted: getOr(false, 'props.track.isMuted', this),
          isSoloing: getOr(false, 'props.track.isSoloing', this),
          onClick: this.handleHeaderClick,
          onIsMutedToggle: this.handleHeaderIsMutedToggle,
          onIsSoloingToggle: this.handleHeaderIsSoloingToggle,
          track: this.props.track,
        }),
        h(MatrixBox, {
          className: '.track',
          fill: palette.emerald[2],
          matrix: this.getMatrix(),
        }, [
          h('.track__sequences', {
            style: this.getBodySequencesStyle(),
          }, [
            ...this.props.track.sequences.map(sequence =>
              h(TrackSequence, {
                onOpen: this.props.onSequenceOpen,
                onSelect: this.props.onSequenceSelect,
                selectedSequence: this.props.selectedSequence,
                sequence,
              }),
            ),
          ]),
        // h(AddSequenceButton, {
        //   onClick: this.handleAddSequenceButtonClick,
        //   track: this.props.track,
        // }),
        ]),
      ]),
    ), { index: this.props.index });
  }

  getBodySequencesStyle = () => ({
    width: this.props.songMeasureCount * 64,
  });

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

  handleAddSequenceButtonClick = (position) => {
    this.props.onSequenceAdd(
      this.props.track,
      position,
    );
  }

  handleBodySequencesSequenceOpen = (sequence) => {
    this.props.onSequenceOpen(sequence);
  }

  handleBodySequencesSequenceSelect = (sequence) => {
    this.props.onSequenceSelect(sequence);
  }

  handleHeaderClick = () => {
    this.props.onTrackSelect(this.props.track);
  }

  handleHeaderIsMutedToggle = () => {
    this.props.onTrackIsMutedToggle(this.props.track);
  }

  handleHeaderIsSoloingToggle = () => {
    this.props.onTrackIsSoloingToggle(this.props.track);
  }
}
