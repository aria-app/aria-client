import isEqual from 'lodash/fp/isEqual';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@material-ui/styles/styled';

const StyledDropdownListItem = styled('div')`
  align-items: center;
  background-color: ${props => props.isSelected && props.theme.midgray};
  cursor: pointer;
  display: flex;
  height: 48px;
  overflow: hidden;
  padding-left: ${props => props.theme.margin.m}px;
  padding-right: ${props => props.theme.margin.m}px;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background-color: ${props => !props.isSelected && props.theme.greystone};
  }
`;

export default class DropdownListItem extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    item: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      text: PropTypes.string,
    }),
    onClick: PropTypes.func,
    selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    selectedItem: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      text: PropTypes.string,
    }),
    style: PropTypes.object,
  };

  render() {
    return (
      <StyledDropdownListItem
        className={this.props.className}
        isSelected={this.getIsSelected()}
        onClick={this.handleClick}
        style={this.props.style}
      >
        {this.props.item.text}
      </StyledDropdownListItem>
    );
  }

  getIsSelected = () => {
    if (this.props.selectedItem) {
      return isEqual(this.props.item, this.props.selectedItem);
    }

    if (this.props.selectedId) {
      return this.props.item.id === this.props.selectedId;
    }

    return false;
  };

  handleClick = () => this.props.onClick(this.props.item);
}
