import first from "lodash/fp/first";
import isEqual from "lodash/fp/isEqual";
import last from "lodash/fp/last";
import { transparentize } from "polished";
import PropTypes from "prop-types";
import React from "react";
import Draggable from "react-draggable";
import styled from "styled-components/macro";
import shared from "../../../shared";

const { getExtraProps } = shared.helpers;

const NoteConnector = styled.div(props => ({
  backgroundColor: props.isSelected
    ? "white"
    : transparentize(0.5, props.theme.primary[2]),
  height: 12,
  left: 20,
  position: "absolute",
  top: 14,
  transformOrigin: "left center",
  transition: "transform 0.1s ease",
  width: 1,
  zIndex: 100,
}));

const NoteFill = styled.div(props => ({
  backgroundColor: props.isSelected ? "white" : props.theme.primary[2],
  borderRadius: 2,
  boxShadow: props.isSelected && `0 0 10px ${transparentize(0.5, "white")}`,
  height: 24,
  width: 24,
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const NotePoint = styled.div({
  alignItems: "center",
  display: "flex",
  flex: "0 0 auto",
  height: 40,
  justifyContent: "center",
  left: 0,
  overflow: "hidden",
  pointerEvents: "all",
  position: "absolute",
  top: 0,
  transition: "transform 0.1s ease",
  width: 40,
  zIndex: 150,
});

const StyledNote = styled.div(props => ({
  left: 0,
  pointerEvents: "none",
  position: "absolute",
  top: 0,
  transition: "transform 0.1s ease",
  zIndex: props.isSelected && 300,
}));

export class Note extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool,
    note: PropTypes.object,
    onDrag: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragStop: PropTypes.func,
    onEndPointDrag: PropTypes.func,
    onEndPointDragStart: PropTypes.func,
    onEndPointDragStop: PropTypes.func,
    positionBounds: PropTypes.object,
    sizeBounds: PropTypes.object,
  };

  static defaultProps = {
    onDrag: () => {},
    onDragStart: () => {},
    onDragStop: () => {},
    onEndPointDrag: () => {},
    onEndPointDragStart: () => {},
    onEndPointDragStop: () => {},
  };

  shouldComponentUpdate(nextProps) {
    if (
      isEqual(nextProps.note, this.props.note) &&
      isEqual(nextProps.isSelected, this.props.isSelected)
    )
      return false;

    return true;
  }

  render() {
    return (
      <Draggable
        bounds={this.props.positionBounds}
        enableUserSelectHack={true}
        grid={[40, 40]}
        handle=".start-point"
        onDrag={this.handleDrag}
        onStart={this.handleDragStart}
        onStop={this.handleDragStop}
        position={this.getPosition()}
      >
        <StyledNote isSelected={this.props.isSelected} {...getExtraProps(this)}>
          <NotePoint className="start-point">
            <NoteFill isSelected={this.props.isSelected} />
          </NotePoint>
          <NoteConnector
            isSelected={this.props.isSelected}
            style={this.getConnectorStyle()}
          />
          <Draggable
            axis="x"
            bounds={this.props.sizeBounds}
            grid={[40, 40]}
            onDrag={this.handleEndPointDrag}
            onStart={this.handleEndPointDragStart}
            onStop={this.handleEndPointDragStop}
            position={this.getEndPointPosition()}
          >
            <NotePoint style={this.getEndPointStyle()}>
              <NoteFill isSelected={this.props.isSelected} />
            </NotePoint>
          </Draggable>
        </StyledNote>
      </Draggable>
    );
  }

  getConnectorStyle() {
    const startPoint = first(this.props.note.points);
    const endPoint = last(this.props.note.points);
    const { asin, abs, PI, sign, sqrt } = Math;
    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;
    const scale = x !== 0 ? sqrt(abs(x ** 2 + y ** 2)) : 0;
    const rotation = x !== 0 ? asin(abs(y / scale)) * (180 / PI) * sign(y) : 0;
    return {
      transform: `rotate(${rotation}deg) scaleX(${scale})`,
    };
  }

  getEndPointPosition = () => ({
    x: (this.props.note.points[1].x - this.props.note.points[0].x) * 40,
    y: (this.props.note.points[1].y - this.props.note.points[0].y) * 40,
  });

  getEndPointStyle() {
    const startPoint = first(this.props.note.points);
    const endPoint = last(this.props.note.points);
    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;
    return {
      display: is32ndNote(this.props.note) ? "none" : "flex",
      transform: `translate(${x}px, ${y}px)`,
    };
  }

  getPosition = () => ({
    x: this.props.note.points[0].x * 40,
    y: this.props.note.points[0].y * 40,
  });

  handleDrag = (e, { deltaX, deltaY }) => {
    this.props.onDrag({
      deltaX: Math.round(deltaX / 40),
      deltaY: Math.round(deltaY / 40),
    });
  };

  handleDragStart = e => {
    this.props.onDragStart(this.props.note, e);
  };

  handleDragStop = () => {
    this.props.onDragStop();
  };

  handleEndPointDrag = (e, { deltaX }) => {
    this.props.onEndPointDrag({
      deltaX: Math.round(deltaX / 40),
    });
  };

  handleEndPointDragStart = e => {
    this.props.onEndPointDragStart(this.props.note, e);
  };

  handleEndPointDragStop = () => {
    this.props.onEndPointDragStop();
  };
}

function is32ndNote(note) {
  const length = last(note.points).x - first(note.points).x;
  return length === 0;
}
