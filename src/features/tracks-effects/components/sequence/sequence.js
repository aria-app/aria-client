import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { SequenceNote } from '../sequence-note/sequence-note';
import './sequence.scss';

export class Sequence extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onOpen: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedSequenceId: PropTypes.string.isRequired,
    sequence: PropTypes.object.isRequired,
  }

  render() {
    return h('.sequence', {
      className: this.getClassName(),
      style: this.getStyle(),
      onClick: this.handleClick,
      onDoubleClick: this.handleDoubleClick,
    }, [
      ...this.props.sequence.notes.map(note =>
        h(SequenceNote, {
          key: note.id,
          note,
        }),
      ),
    ]);
  }

  getClassName() {
    return classnames({
      'sequence--active': this.getIsSelected(),
    }, this.props.className);
  }

  getIsSelected = () =>
    this.props.sequence.id === this.props.selectedSequenceId;

  getStyle() {
    return {
      transform: `translateX(${measureCountToPx(this.props.sequence.position)}px)`,
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
