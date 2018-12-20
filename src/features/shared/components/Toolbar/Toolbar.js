import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const StyledToolbar = styled.div`
  align-items: stretch;
  background-color: ${props => props.theme.almostwhite};
  display: flex;
  flex: 0 0 auto;
  height: 56px;
  padding-left: ${props => props.theme.margin.s}px;
  padding-right: ${props => props.theme.margin.s}px;
  position: relative;
`;

const ToolbarLeftItems = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
`;

const ToolbarRightItems = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  margin-left: auto;
`;

export class Toolbar extends React.Component {
  static propTypes = {
    alternateLeftItems: PropTypes.node,
    alternateRightItems: PropTypes.node,
    isAlternate: PropTypes.bool,
    leftItems: PropTypes.node,
    rightItems: PropTypes.node,
    style: PropTypes.object,
  }

  static defaultProps = {
    alternateLeftItems: [],
    alternateRightItems: [],
    leftItems: [],
    rightItems: [],
  }

  render() {
    return (
      <StyledToolbar
        style={this.props.style}>
        <ToolbarLeftItems>
          {this.getLeftItems()}
        </ToolbarLeftItems>
        <ToolbarRightItems>
          {this.getRightItems()}
        </ToolbarRightItems>
      </StyledToolbar>
    );
  }

  getLeftItems() {
    return this.props.isAlternate
      ? this.props.alternateLeftItems
      : this.props.leftItems;
  }

  getRightItems() {
    return this.props.isAlternate
      ? this.props.alternateRightItems
      : this.props.rightItems;
  }
}
