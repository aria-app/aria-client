import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";
import { getExtraProps } from "../../helpers";

const StyledToolbar = styled.div(props => ({
  alignItems: "stretch",
  backgroundColor: props.theme.greystone,
  borderTop: `1px solid ${props.theme.midgray}`,
  display: "flex",
  flex: "0 0 auto",
  height: 56,
  paddingLeft: props.theme.margin.s,
  paddingRight: props.theme.margin.s,
  position: "relative",
}));

const ToolbarLeftItems = styled.div({
  alignItems: "center",
  display: "flex",
  flex: "1 1 auto",
});

const ToolbarRightItems = styled.div({
  alignItems: "center",
  display: "flex",
  flex: "0 0 auto",
  marginLeft: "auto",
});

export class Toolbar extends React.Component {
  static propTypes = {
    isAlternate: PropTypes.bool,
    leftItems: PropTypes.node,
    leftItemsAlt: PropTypes.node,
    rightItems: PropTypes.node,
    rightItemsAlt: PropTypes.node,
  };

  static defaultProps = {
    leftItems: [],
    leftItemsAlt: [],
    rightItems: [],
    rightItemsAlt: [],
  };

  render() {
    return (
      <StyledToolbar {...getExtraProps(this)}>
        <ToolbarLeftItems>{this.getLeftItems()}</ToolbarLeftItems>
        <ToolbarRightItems>{this.getRightItems()}</ToolbarRightItems>
      </StyledToolbar>
    );
  }

  getLeftItems() {
    return this.props.isAlternate
      ? this.props.leftItemsAlt
      : this.props.leftItems;
  }

  getRightItems() {
    return this.props.isAlternate
      ? this.props.rightItemsAlt
      : this.props.rightItems;
  }
}
