import getOr from 'lodash/fp/getOr';
import isEqual from 'lodash/fp/isEqual';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import TrackSequenceNote from './TrackSequenceNote';

const StyledTrackSequence = styled.div(props => ({
  display: 'flex',
  height: 84,
  padding: props.theme.margin.s,
  backgroundColor: props.isSelected
    ? props.theme.almostwhite
    : props.theme.primary[2],
  borderRight: `2px solid ${
    props.isSelected ? props.theme.almostwhite : props.theme.primary[0]
  }`,
  boxShadow: props.isSelected && '0 0 10px rgba(255, 255, 255, 0.5)}',
  opacity: 1,
  overflow: 'hidden',
  position: 'relative',
  transition: 'box-shadow 250ms ease, opacity 500ms ease, transform 350ms ease',
  '&:hover': {
    backgroundColor: !props.isSelected && props.theme.primary[1],
  },
  ...(props.isDragging
    ? {
        boxShadow: '0 4px 16px 4px rgba(0, 0, 0, 0.25)',
        opacity: 0.8,
        transform: 'translateY(-4px) scale(1.05)',
        transition:
          'box-shadow 250ms ease, opacity 500ms ease, transform 150ms ease',
      }
    : {}),
}));

export default class TrackSequence extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isDragging: PropTypes.bool,
    isSelected: PropTypes.bool,
    onOpen: PropTypes.func,
    onSelect: PropTypes.func,
    sequence: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  render() {
    return (
      <StyledTrackSequence
        isDragging={this.props.isDragging}
        isSelected={this.props.isSelected}
        style={this.getStyle()}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
      >
        {this.props.sequence.notes.map(note => (
          <TrackSequenceNote key={note.id} note={note} />
        ))}
      </StyledTrackSequence>
    );
  }

  getStyle = () => {
    const measureCount = getOr(1, 'props.sequence.measureCount', this);

    return {
      width: measureCountToPx(measureCount),
    };
  };

  handleClick = () => {
    if (this.props.isSelected) return;

    this.props.onSelect(this.props.sequence);
  };

  handleDoubleClick = () => {
    this.props.onOpen(this.props.sequence);
  };
}

function measureCountToPx(count) {
  return count * 4 * 8 * 2;
}
