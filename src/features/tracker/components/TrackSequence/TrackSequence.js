import getOr from 'lodash/fp/getOr';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { TrackSequenceNote } from '../TrackSequenceNote/TrackSequenceNote';
import './TrackSequence.scss';

export class TrackSequence extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onOpen: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedSequence: PropTypes.object.isRequired,
    sequence: PropTypes.object.isRequired,
  }

  render() {
    return h('.track-sequence', {
      className: this.getClassName(),
      style: this.getStyle(),
      onClick: this.handleClick,
      onDoubleClick: this.handleDoubleClick,
    }, [
      ...this.props.sequence.notes.map(note =>
        h(TrackSequenceNote, {
          key: note.id,
          note,
        }),
      ),
    ]);
  }

  getClassName() {
    return classnames({
      'track-sequence--active': this.getIsSelected(),
    }, this.props.className);
  }

  getIsSelected = () => {
    const sequenceId = getOr('', 'props.sequence.id', this);
    const selectedSequenceId = getOr('', 'props.selectedSequence.id', this);

    if (!selectedSequenceId) return false;

    return sequenceId === selectedSequenceId;
  };

  getStyle() {
    return {
      left: measureCountToPx(this.props.sequence.position),
      width: measureCountToPx(this.props.sequence.measureCount),
    };
  }

  handleClick = (e) => {
    e.stopPropagation();

    if (this.getIsSelected()) {
      this.props.onOpen(this.props.sequence);
      return;
    }

    this.props.onSelect(this.props.sequence);
  }
}

function measureCountToPx(count) {
  return ((count * 4) * 8) * 2;
}
