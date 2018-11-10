import classnames from 'classnames';
import find from 'lodash/fp/find';
import PropTypes from 'prop-types';
import React from 'react';
import { hideIf, showIf } from 'react-render-helpers';
import { DropdownListItem } from '../DropdownListItem/DropdownListItem';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import './DropdownList.scss';

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

  componentDidUpdate(newProps, newState) {
    if (!this.state.isOpen && newState.isOpen && this.popupRef) {
      this.popupRef.scrollTop = this.getSelectedItemScrollTop();
    }
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        style={this.props.style}>
        {showIf(this.props.icon)(
          <IconButton
            className="dropdown-list__button"
            onClick={this.handleButtonClick}
            icon={this.props.icon}
          />
        )}
        {hideIf(this.props.icon)(
          <div
            className="dropdown-list__input"
            onClick={this.handleInputClick}>
            <span
              className="dropdown-list__input__text">
              {this.getText()}
            </span>
            <Icon
              className="dropdown-list__input__caret"
              icon="caret-down"
              size="small"
            />
          </div>
        )}
        {showIf(this.state.isOpen)(
          <React.Fragment>
            <div
              className="dropdown-list__overlay"
              onClick={this.handleOverlayClick}
            />
            <div
              className="dropdown-list__popup"
              ref={this.setPopupRef}
              style={this.getPopupStyle()}>
              <div
                className="dropdown-list__popup__list">
                {this.props.items.map((item, index) => (
                  <DropdownListItem
                    className="dropdown__list__popup__list__item"
                    key={index}
                    onClick={this.handlePopupListItemClick}
                    selectedId={this.props.selectedId}
                    selectedItem={this.props.selectedItem}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }

  getClassName = () =>
    classnames('dropdown-list', this.props.className);

  getPopupStyle = () => {
    return {
      height: (this.props.items.length * 48) + 16,
    };
  }

  getSelectedItem = () => {
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

  getSelectedItemScrollTop = () => {
    const selectedItem = this.getSelectedItem();

    if (!selectedItem) return 0;

    return (this.props.items.indexOf(selectedItem) - 2) * 48;
  }

  getText = () => {
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
