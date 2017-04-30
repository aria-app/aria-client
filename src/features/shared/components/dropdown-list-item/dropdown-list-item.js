import isEqual from 'lodash/fp/isEqual';
import React from 'react';
import StylePropType from 'react-style-proptype';
import classnames from 'classnames';
import h from 'react-hyperscript';
import './dropdown-list-item.scss';

export class DropdownListItem extends React.PureComponent {
  static propTypes = {
    className: React.PropTypes.string,
    item: React.PropTypes.shape({
      id: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string,
      ]),
      text: React.PropTypes.string,
    }).isRequired,
    onClick: React.PropTypes.func.isRequired,
    selectedId: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    selectedItem: React.PropTypes.shape({
      id: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string,
      ]),
      text: React.PropTypes.string,
    }),
    style: StylePropType,
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
