import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { getExtraProps } from '../../helpers';

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
    isAlternate: PropTypes.bool,
    leftItems: PropTypes.node,
    leftItemsAlt: PropTypes.node,
    rightItems: PropTypes.node,
    rightItemsAlt: PropTypes.node,
  }

  static defaultProps = {
    leftItems: [],
    leftItemsAlt: [],
    rightItems: [],
    rightItemsAlt: [],
  }

  render() {
    return (
      <StyledToolbar
        {...getExtraProps(this)}>
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
      ? this.props.leftItemsAlt
      : this.props.leftItems;
  }

  getRightItems() {
    return this.props.isAlternate
      ? this.props.rightItemsAlt
      : this.props.rightItems;
  }
}
