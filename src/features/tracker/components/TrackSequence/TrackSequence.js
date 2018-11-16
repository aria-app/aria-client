import classnames from 'classnames';
import getOr from 'lodash/fp/getOr';
import PropTypes from 'prop-types';
import React from 'react';
import { TrackSequenceNote } from '../TrackSequenceNote/TrackSequenceNote';
import './TrackSequence.scss';

export class TrackSequence extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    index: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    sequence: PropTypes.object,
  }

  static defaultProps = {
    index: 0,
  }

  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        style={this.getStyle()}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
        ref={this.ref}>
        {this.props.sequence.notes.map(note => (
          <TrackSequenceNote
            key={note.id}
            note={note}
          />
        ))}
      </div>
    );
  }

  getClassName() {
    return classnames('track-sequence', {
      'track-sequence--active': this.props.isSelected,
    }, this.props.className);
  }

  getStyle = () => {
    const measureCount = getOr(1, 'props.sequence.measureCount', this);

    return {
      width: measureCountToPx(measureCount),
    };
  }

  handleClick = () => {
    if (this.props.isSelected) return;

    this.props.onSelect(this.props.sequence);
  }

  handleDocumentMouseDown = (e) => {
    if (!this.props.isSelected) return;
    if (this.ref.current.contains(e.target)) return;
    e.preventDefault();
    this.props.onDeselect();
  };

  handleDoubleClick = () => {
    this.props.onOpen(this.props.sequence);
  };
}

function measureCountToPx(count) {
  return ((count * 4) * 8) * 2;
}
