import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";
import { Icon } from "../Icon/Icon";

const IconButtonBackground = styled.div`
  background-color: ${props =>
    props.isActive ? "rgba(255, 255, 255, 0.25)" : ""};
  flex: 1 0 auto;
`;

const IconButtonIconWrapper = styled.div`
  opacity: ${props => (props.isDisabled ? 0.5 : "")};
  position: absolute;
`;

const StyledIconButton = styled.div`
  align-items: stretch;
  cursor: ${props => (props.isDisabled ? "not-allowed" : "pointer")};
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  height: 40px;
  position: relative;
  transform: scale(1);
  transition: transform 0.2s ease;
  width: 40px;

  &:hover {
    transform: ${props =>
      !(props.isActive || props.isDisabled) ? "scale(1.1)" : ""};
  }

  &:active {
    transform: ${props => (!props.isDisabled ? "scale(0.9)" : "")};
  }
`;

export class IconButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    getRef: PropTypes.func,
    icon: PropTypes.string,
    iconProps: PropTypes.object,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(["small", "regular", "large", ""]),
    style: PropTypes.object,
    title: PropTypes.string
  };

  static defaultProps = {
    iconProps: {}
  };

  render() {
    return (
      <StyledIconButton
        className={this.props.className}
        isActive={this.props.isActive}
        isDisabled={this.props.isDisabled}
        onClick={this.handleClick}
        ref={this.props.getRef}
        style={this.props.style}
        title={this.props.title}
      >
        <IconButtonBackground isActive={this.props.isActive} />
        <IconButtonIconWrapper isDisabled={this.props.isDisabled}>
          <Icon
            color={this.props.color}
            icon={this.props.icon}
            size={this.props.size}
            {...this.props.iconProps}
          />
        </IconButtonIconWrapper>
      </StyledIconButton>
    );
  }

  handleClick = e => {
    if (this.props.isDisabled) return;

    this.props.onClick(e);
  };
}
