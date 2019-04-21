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
  box-shadow: ${props =>
    props.isSelected && `0 0 10px rgba(255, 255, 255, 0.5)}`}
  opacity: ${props => (props.isMounted ? "1" : "0")};
  overflow: hidden;
  position: relative;
  transform: ${props => (props.isMounted ? "scaleY(1)" : "scaleY(0)")};
  transition: box-shadow 250ms ease, opacity 500ms ease, transform 350ms ease;
  &:hover {
    background-color: ${props => !props.isSelected && props.theme.primary[1]};
  }
  ${props =>
    props.isDragging
      ? `
      box-shadow: 0 4px 16px 4px rgba(0, 0, 0, 0.25);
      opacity: 0.80;
      transform: translateY(-4px) scale(1.05);
      transition: box-shadow 250ms ease, opacity 500ms ease, transform 150ms ease;`
      : ""}
`;

export class TrackSequence extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    sequence: PropTypes.object
  };

  static defaultProps = {
    index: 0
  };

  state = {
    isMounted: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isMounted: true
      });
    }, 16);
  }

  render() {
    return (
      <StyledTrackSequence
        isDragging={this.props.isDragging}
        isMounted={this.state.isMounted}
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
