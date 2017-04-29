import { find, isEqual } from 'lodash/fp';
import React from 'react';
import StylePropType from 'react-style-proptype';
import classnames from 'classnames';
import h from 'react-hyperscript';
import { hideIf, showIf } from '../../helpers';
import { Icon } from '../icon/icon';
import { IconButton } from '../icon-button/icon-button';
import './dropdown-list.scss';

export class DropdownList extends React.PureComponent {
  static propTypes = {
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string,
      ]),
      text: React.PropTypes.string,
    })).isRequired,
    onSelectedIdChange: React.PropTypes.func,
    onSelectedItemChange: React.PropTypes.func,
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
    text: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentWillUpdate(newProps, newState) {
    if (!this.state.isOpen && newState.isOpen && this.popupRef) {
      this.popupRef.scrollTop = this.getSelectedItemScrollTop();
    }
  }

  render() {
    return h('.dropdown-list', {
      className: this.props.className,
      style: this.props.style,
    }, [
      showIf(!!this.props.icon)(
        h(IconButton, {
          className: 'dropdown-list__button',
          onClick: this.handleButtonClick,
          icon: this.props.icon || '',
        }),
      ),
      hideIf(!!this.props.icon)(
        h('.dropdown-list__input', {
          onClick: this.handleInputClick,
        }, [
          h('span.dropdown-list__input__text', [
            this.getText(),
          ]),
          h(Icon, {
            className: 'dropdown-list__input__caret',
            icon: 'caret-down',
            size: 'small',
          }),
        ]),
      ),
      showIf(this.state.isOpen)(
        h('.dropdown-list__overlay', {
          onClick: this.handleOverlayClick,
        }),
      ),
      showIf(this.state.isOpen)(
        h('.dropdown-list__popup', {
          ref: this.setPopupRef,
          style: this.getPopupStyle(),
        }, [
          h('.dropdown-list__popup__list', [
            ...this.props.items.map(item => h('.dropdown-list__popup__list__item', {
              className: this.getPopupListItemClassName(item),
              onClick: () => this.handlePopupListItemClick(item),
            }, [
              item.text,
            ])),
          ]),
        ]),
      ),
    ]);
  }

  getIsItemSelected(item) {
    if (this.props.selectedItem) {
      return isEqual(item, this.props.selectedItem);
    }

    if (this.props.selectedId) {
      return item.id === this.props.selectedId;
    }

    return false;
  }

  getPopupListItemClassName(item) {
    return classnames({
      'dropdown-list__popup__list__item--active': this.getIsItemSelected(item),
    });
  }

  getPopupStyle() {
    return {
      height: (this.props.items.length * 48) + 16,
    };
  }

  getSelectedItem() {
    if (this.props.selectedItem) {
      return this.props.selectedItem;
    }

    if (this.props.selectedId) {
      return find({
        id: this.props.selectedId,
      })(this.props.items);
    }

    return undefined;
  }

  getSelectedItemScrollTop() {
    const selectedItem = this.getSelectedItem();

    if (!selectedItem) return 0;

    return (this.props.items.indexOf(selectedItem) - 2) * 48;
  }

  getText() {
    if (this.props.text) return this.props.text;

    const selectedItem = this.getSelectedItem();

    if (selectedItem) return selectedItem.text;

    return '';
  }

  handleButtonClick = () => {
    this.setState({
      isOpen: true,
    });
  }

  handleInputClick = () => {
    this.setState({
      isOpen: true,
    });
  }

  handleOverlayClick = () => {
    this.setState({
      isOpen: false,
    });
  }

  handlePopupListItemClick = (item) => {
    if (this.props.onSelectedIdChange) {
      this.props.onSelectedIdChange(item.id);
    }

    if (this.props.onSelectedItemChange) {
      this.props.onSelectedItemChange(item);
    }

    this.setState({
      isOpen: false,
    });
  }

  setPopupRef = (ref) => {
    this.popupRef = ref;

    this.forceUpdate();

    if (!this.popupRef) return;

    this.popupRef.scrollTop = this.getSelectedItemScrollTop();
  }
}
