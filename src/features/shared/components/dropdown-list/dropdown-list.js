import find from 'lodash/fp/find';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { hideIf, showIf } from '../../helpers';
import { DropdownListItem } from '../dropdown-list-item/dropdown-list-item';
import { Icon } from '../icon/icon';
import { IconButton } from '../icon-button/icon-button';
import './dropdown-list.scss';

export class DropdownList extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      text: PropTypes.string,
    })).isRequired,
    onSelectedIdChange: PropTypes.func,
    onSelectedItemChange: PropTypes.func,
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
    text: PropTypes.string,
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
            ...this.props.items.map(item =>
              h(DropdownListItem, {
                className: 'dropdown-list__popup__list__item',
                onClick: this.handlePopupListItemClick,
                selectedId: this.props.selectedId,
                selectedItem: this.props.selectedItem,
                item,
              }),
            ),
          ]),
        ]),
      ),
    ]);
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
