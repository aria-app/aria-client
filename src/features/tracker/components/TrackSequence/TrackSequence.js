import classnames from 'classnames';
import getOr from 'lodash/fp/getOr';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { AddSequenceButton } from '../AddSequenceButton/AddSequenceButton';
import { TrackSequenceNote } from '../TrackSequenceNote/TrackSequenceNote';
import './TrackSequence.scss';

export class TrackSequence extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    index: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSequenceAdd: PropTypes.func.isRequired,
    sequence: PropTypes.object,
  }

  static defaultProps = {
    index: 0,
  }

  render() {
    if (!this.props.sequence) {
      return h(SortableElement(() => h(AddSequenceButton, {
        onClick: this.handleAddSequenceButtonClick,
      })), {
        collection: 1,
        index: this.props.index,
      });
    }

    return h(SortableElement(() =>
      h(SortableHandle(() =>
        h('.track-sequence', {
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
        ])),
      ),
    ), {
      collection: 1,
      index: this.props.index,
    });
  }

  getClassName() {
    return classnames({
      'track-sequence--active': this.props.isSelected,
    }, this.props.className);
  }

  getStyle = () => {
    const measureCount = getOr(1, 'props.sequence.measureCount', this);

    return {
      width: measureCountToPx(measureCount),
    };
  }

  handleAddSequenceButtonClick = () => {
    this.props.onSequenceAdd(this.props.index);
  };

  handleClick = (e) => {
    e.stopPropagation();

    if (this.props.isSelected) {
      this.props.onOpen(this.props.sequence);
      return;
    }

    this.props.onSelect(this.props.sequence);
  }
}

function measureCountToPx(count) {
  return ((count * 4) * 8) * 2;
}
