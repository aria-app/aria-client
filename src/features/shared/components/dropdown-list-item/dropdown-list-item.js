import isEqual from 'lodash/fp/isEqual';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import h from 'react-hyperscript';
import './dropdown-list-item.scss';

export class DropdownListItem extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    item: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      text: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    selectedId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    selectedItem: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      text: PropTypes.string,
    }),
    style: PropTypes.object,
  }

  render() {
    return h('.dropdown-list-item', {
      className: this.getClassName(),
      onClick: this.handleClick,
      style: this.props.style,
    }, [
      this.props.item.text,
    ]);
  }

  getClassName = () =>
    classnames({
      'dropdown-list-item--active': this.getIsSelected(),
    }, this.props.className);


  getIsSelected = () => {
    if (this.props.selectedItem) {
      return isEqual(this.props.item, this.props.selectedItem);
    }

    if (this.props.selectedId) {
      return this.props.item.id === this.props.selectedId;
    }

    return false;
  };

  handleClick = () =>
    this.props.onClick(this.props.item);
}
