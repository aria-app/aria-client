import isEqual from "lodash/fp/isEqual";
import PropTypes from "prop-types";
import React from "react";
import { DraggableCore } from "react-draggable";
import styled from "styled-components/macro";
import { Fence } from "../Fence/Fence";

const StyledSelector = styled.div({
  bottom: 0,
  left: 0,
  position: "absolute",
  right: 0,
  top: 0
});

export class Selector extends React.PureComponent {
  static propTypes = {
    isEnabled: PropTypes.bool,
    onSelect: PropTypes.func
  };

  state = {
    endPoint: {},
    startPoint: {}
  };

  render() {
    return (
      <DraggableCore
        grid={[40, 40]}
        onDrag={this.handleDrag}
        onStart={this.handleDragStart}
        onStop={this.handleDragStop}
      >
        <StyledSelector
          style={{
            pointerEvents: this.props.isEnabled ? "all" : "none"
          }}
        >
          <Fence
            endPoint={this.state.endPoint}
            startPoint={this.state.startPoint}
          />
        </StyledSelector>
      </DraggableCore>
    );
  }

  handleDrag = (e, dragData) => {
    this.setState(state => {
      const newEndPoint = dragDataToGridPoint(dragData);

      if (isEqual(newEndPoint, state.endPoint)) return null;

      return {
        endPoint: newEndPoint
      };
    });
  };

  handleDragStart = (e, dragData) => {
    this.setState({
      startPoint: dragDataToGridPoint(dragData)
    });
  };

  handleDragStop = e => {
    this.props.onSelect(
      this.state.startPoint,
      this.state.endPoint,
      e.ctrlKey || e.metaKey
    );

    this.setState({
      endPoint: {},
      startPoint: {}
    });
  };
}

function dragDataToGridPoint(dragData) {
  return {
    x: Math.floor(dragData.x / 40),
    y: Math.floor(dragData.y / 40)
  };
}
