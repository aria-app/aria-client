import find from 'lodash/fp/find';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { hideIf, showIf } from 'react-render-helpers';
import { getExtraProps } from '../../helpers';
import { DropdownListItem } from '../DropdownListItem/DropdownListItem';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';

const DropdownListInput = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.almostblack};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 48px;
  justify-content: space-between;
  overflow: hidden;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
`;

const DropdownListItems = styled.div`
  padding-bottom: ${props => props.theme.margin.s}px;
  padding-top: ${props => props.theme.margin.s}px;
`;

const DropdownListOverlay = styled.div`
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 500;
`;

const DropdownListPopup = styled.div`
  background-color: ${props => props.theme.almostblack};
  border-radius: ${props => props.borderRadius};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  max-height: 256px;
  min-width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 500;
`;

const StyledDropdownList = styled.div`
  flex-shrink: 0;
  position: relative;
`;

export class DropdownList extends React.PureComponent {
  static propTypes = {
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
      <StyledDropdownList
        {...getExtraProps(this)}>
        {showIf(this.props.icon)(
          <IconButton
            className="dropdown-list__button"
            onClick={this.handleButtonClick}
            icon={this.props.icon}
          />
        )}
        {hideIf(this.props.icon)(
          <DropdownListInput
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
          </DropdownListInput>
        )}
        {showIf(this.state.isOpen)(
          <React.Fragment>
            <DropdownListOverlay
              onClick={this.handleOverlayClick}
            />
            <DropdownListPopup
              ref={this.setPopupRef}
              style={this.getPopupStyle()}>
              <DropdownListItems>
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
              </DropdownListItems>
            </DropdownListPopup>
          </React.Fragment>
        )}
      </StyledDropdownList>
    );
  }

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
