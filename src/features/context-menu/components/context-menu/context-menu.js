import { clamp } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { ContextMenuItem } from '../context-menu-item/context-menu-item';
import './context-menu.scss';

const { showIf } = shared.helpers;

export class ContextMenu extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onIsOpenChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }).isRequired,
    style: PropTypes.object,
    windowHeight: PropTypes.number.isRequired,
    windowWidth: PropTypes.number.isRequired,
  }

  render() {
    return h('.context-menu', {
      className: this.props.className,
      style: this.props.style,
    }, [
      showIf(this.props.isOpen)(
        h('.context-menu__overlay', {
          onClick: this.handleOverlayClick,
        }, [
          h('.context-menu__overlay__popup', {
            style: this.getOverlayPopupStyle(),
          }, [
            h('.context-menu__overlay__popup__list', [
              ...this.props.items.map(item => h(ContextMenuItem, {
                key: item.text,
                onClick: this.handleOverlayPopupListItemClick,
                item,
              })),
            ]),
          ]),
        ]),
      ),
    ]);
  }

  getOverlayPopupStyle() {
    const clampX = clamp(0, this.props.windowWidth - 202);
    const x = clampX(this.props.position.x);

    const popupHeight = 16 + (this.props.items.length * 48);
    const clampY = clamp(0, this.props.windowHeight - popupHeight);
    const y = clampY(this.props.position.y);

    return {
      transform: `translate(${x}px, ${y}px)`,
    };
  }

  handleOverlayClick = () => {
    if (!this.props.onIsOpenChange) return;
    this.props.onIsOpenChange(false);
  }

  handleOverlayPopupListItemClick = (item, e) => {
    if (!this.props.onSelect) return;
    this.props.onSelect(item);
    e.stopPropagation();
  }
}
