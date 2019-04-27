import isEmpty from "lodash/fp/isEmpty";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";
import { Fence } from "../Fence/Fence";

const StyledSelector = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export class Selector extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isEnabled: PropTypes.bool,
    mousePoint: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  state = {
    endPoint: {},
    startPoint: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.mousePoint.x < 0 || nextProps.mousePoint.y < 0) {
      this.setState({
        startPoint: {}
      });
    }
  }

  render() {
    return (
      <StyledSelector
        onMouseDown={this.handleMouseDown}
        // onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        style={{
          pointerEvents: this.props.isEnabled ? "all" : "none"
        }}
      >
        <Fence
          endPoint={this.props.mousePoint}
          startPoint={this.state.startPoint}
        />
      </StyledSelector>
    );
  }

  handleMouseDown = () => {
    this.setState({
      startPoint: this.props.mousePoint
    });
  };

  handleMouseUp = e => {
    if (isEmpty(this.state.startPoint)) return;

    this.props.onSelect(this.state.startPoint, e.ctrlKey || e.metaKey);

    this.setState({
      startPoint: {}
    });
  };
}
