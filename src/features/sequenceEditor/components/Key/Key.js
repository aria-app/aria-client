import { includes } from "lodash/fp";
import { transparentize } from "polished";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";

const KeyLabel = styled.div`
  color: ${props => props.theme.almostblack};
  display: ${props =>
    includes("C", props.step.name) && !includes("#", props.step.name)
      ? "block"
      : "none"};
`;

const StyledKey = styled.div`
  align-items: center;
  background-color: ${props =>
    includes("#", props.step.name)
      ? transparentize(0.75, props.theme.almostwhite)
      : props.theme.almostwhite};
  box-shadow: 2px 0 0
    ${props =>
      transparentize(
        includes("#", props.step.name) ? 0.9 : 0.5,
        props.theme.almostwhite
      )};
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  height: 36px;
  justify-content: center;
  margin-bottom: 2px;
  margin-top: 2px;
  position: relative;
  ::after {
    background-color: ${props => props.theme.primary[2]};
    bottom: 0;
    box-shadow: 2px 0 5px ${props => props.theme.primary[2]};
    content: "";
    display: block;
    right: -2px;
    opacity: ${props => (props.isHoveredRow ? 1 : 0)};
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: opacity 50ms ease;
    width: 2px;
  }
`;

export class Key extends React.PureComponent {
  static propTypes = {
    isHoveredRow: PropTypes.bool,
    onMouseDown: PropTypes.func,
    step: PropTypes.object,
    style: PropTypes.object
  };

  render() {
    return (
      <StyledKey
        isHoveredRow={this.props.isHoveredRow}
        onMouseDown={this.handleMouseDown}
        step={this.props.step}
        style={this.props.style}
      >
        <KeyLabel step={this.props.step}>{this.props.step.name}</KeyLabel>
      </StyledKey>
    );
  }

  handleMouseDown = () => this.props.onMouseDown(this.props.step);
}
