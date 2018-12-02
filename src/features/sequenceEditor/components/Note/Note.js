import first from 'lodash/fp/first';
import includes from 'lodash/fp/includes';
import last from 'lodash/fp/last';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import * as constants from '../../constants';

const NoteConnector = styled.div`
  background-color: ${props => props.isSelected
    ? 'white'
    : transparentize(0.5, props.theme.primary[2])};
  height: 12px;
  left: 20px;
  position: absolute;
  top: 14px;
  transform-origin: left center;
  transition: transform 0.1s ease;
  width: 1px;
  z-index: 100;
`;

const NoteFill = styled.div`
  background-color: ${props => props.isSelected
    ? 'white'
    : props.theme.primary[2]};
  border-radius: 2px;
  box-shadow: ${props => props.isSelected && `0 0 10px ${transparentize(0.5, 'white')}`};
  height: 24px;
  width: 24px;

  &:hover:not(:active) {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const NotePoint = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  height: 40px;
  justify-content: center;
  left: 0;
  overflow: hidden;
  pointer-events: all;
  position: absolute;
  top: 0;
  transition: transform 0.1s ease;
  width: 40px;
  z-index: 150;
`;

const StyledNote = styled.div`
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 0.1s ease;
  z-index: ${props => props.isSelected && 300};
`;

export class Note extends React.PureComponent {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    note: PropTypes.object.isRequired,
    onErase: PropTypes.func.isRequired,
    onMoveStart: PropTypes.func.isRequired,
    onResizeStart: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    toolType: PropTypes.string.isRequired,
  }

  static defaultProps = {
    isSelected: false,
  }

  render() {
    return (
      <StyledNote
        isSelected={this.props.isSelected}
        style={this.getStyle()}>
        <NotePoint
          onMouseDown={this.handleStartPointMouseDown}
          onMouseUp={this.handleStartPointMouseUp}>
          <NoteFill
            isSelected={this.props.isSelected}
          />
        </NotePoint>
        <NoteConnector
          isSelected={this.props.isSelected}
          style={this.getConnectorStyle()}
        />
        <NotePoint
          onMouseDown={this.handleEndPointMouseDown}
          style={this.getEndPointStyle()}>
          <NoteFill
            isSelected={this.props.isSelected}
          />
        </NotePoint>
      </StyledNote>
    );
  }

  getConnectorStyle() {
    const startPoint = first(this.props.note.points);
    const endPoint = last(this.props.note.points);
    const { asin, abs, PI, sign, sqrt } = Math;
    const x = ((endPoint.x - startPoint.x) * 40);
    const y = (endPoint.y - startPoint.y) * 40;
    const scale = x !== 0
      ? sqrt(abs((x ** 2) + (y ** 2)))
      : 0;
    const rotation = x !== 0
      ? asin(abs(y / scale)) * (180 / PI) * sign(y)
      : 0;
    return {
      transform: `rotate(${rotation}deg) scaleX(${scale})`,
    };
  }

  getEndPointStyle() {
    const startPoint = first(this.props.note.points);
    const endPoint = last(this.props.note.points);
    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;
    return {
      display: is32ndNote(this.props.note) ? 'none' : 'flex',
      transform: `translate(${x}px, ${y}px)`,
    };
  }



  getIsEraseEnabled = () =>
    includes(this.props.toolType, [
      constants.toolTypes.ERASE,
    ]);

  getIsSelectEnabled = () =>
    includes(this.props.toolType, [
      constants.toolTypes.DRAW,
      constants.toolTypes.SELECT,
    ]);

  getStyle() {
    const { x, y } = first(this.props.note.points);
    return {
      transform: `translate(${x * 40}px, ${y * 40}px)`,
    };
  }

  handleEndPointMouseDown = (e) => {
    if (this.getIsSelectEnabled()) {
      e.stopPropagation();

      if (!this.props.isSelected) {
        this.select(e);
      }

      this.props.onResizeStart();
    }
  }

  handleStartPointMouseDown = (e) => {
    if (this.getIsSelectEnabled()) {
      e.stopPropagation();
      if (this.props.isSelected && !(e.ctrlKey || e.metaKey)) {
        this.props.onMoveStart();
        return;
      }
      this.select(e);
      this.props.onMoveStart();
    }
  }

  handleStartPointMouseUp = () => {
    if (this.getIsEraseEnabled()) {
      this.props.onErase(this.props.note);
    }
  }

  select = e =>
    this.props.onSelect(
      this.props.note,
      e.ctrlKey || e.metaKey,
    );
}

function is32ndNote(note) {
  const length = last(note.points).x - first(note.points).x;
  return length === 0;
}
