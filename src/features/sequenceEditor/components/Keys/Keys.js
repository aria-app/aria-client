import Dawww from "dawww";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";
import { Key } from "../Key/Key";

const StyledKeys = styled.div({
  display: "flex",
  flex: "0 0 auto",
  flexDirection: "column",
  width: 40,
});

export class Keys extends React.PureComponent {
  static propTypes = {
    gridMousePoint: PropTypes.object,
    onKeyPress: PropTypes.func,
  };

  render() {
    return (
      <StyledKeys>
        {this.getScale().map((step, index) => (
          <Key
            isHoveredRow={this.getIsHoveredRow(step)}
            key={step.y}
            onMouseDown={this.handleKeyMouseDown}
            step={step}
            style={{
              borderBottomRightRadius:
                index === this.getScale().length - 1 ? 4 : "",
              boxShadow:
                index === this.getScale().length - 1
                  ? "2px 2px 0 rgba(235, 235, 235, 0.5)"
                  : "",
              borderTopRightRadius: index === 0 ? 4 : "",
            }}
          />
        ))}
      </StyledKeys>
    );
  }

  getIsHoveredRow = step => step.y === this.props.gridMousePoint.y;

  getScale = () => Dawww.SCALE;

  handleKeyMouseDown = step => {
    this.props.onKeyPress(step.y);
  };
}
