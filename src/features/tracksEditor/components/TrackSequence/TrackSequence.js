import getOr from "lodash/fp/getOr";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";
import { TrackSequenceNote } from "../TrackSequenceNote/TrackSequenceNote";

const StyledTrackSequence = styled.div`
  display: flex;
  height: 84px;
  padding: $margin-s;
  background-color: ${props =>
    props.isSelected ? props.theme.almostwhite : props.theme.primary[2]};
  border-right: 2px solid
    ${props =>
      props.isSelected ? props.theme.almostwhite : props.theme.primary[0]};
  overflow: hidden;
  position: relative;
  transition: box-shadow 150ms ease, transform 150ms ease;
  &:hover {
    background-color: ${props => !props.isSelected && props.theme.primary[1]};
  }
  &:active {
    box-shadow: 0 4px 16px 4px rgba(0, 0, 0, 0.25);
    transform: scale(1.05);
  }
`;

export class TrackSequence extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    index: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    sequence: PropTypes.object
  };

  static defaultProps = {
    index: 0
  };

  render() {
    return (
      <StyledTrackSequence
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
    const measureCount = getOr(1, "props.sequence.measureCount", this);

    return {
      width: measureCountToPx(measureCount)
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
