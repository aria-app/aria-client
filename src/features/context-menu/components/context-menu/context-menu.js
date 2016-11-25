import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import shared from '../../../shared';
import './context-menu.scss';

const { Icon } = shared.components;

export class ContextMenu extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    isOpen: React.PropTypes.bool.isRequired,
    items: React.PropTypes.arrayOf(
      React.PropTypes.object,
    ).isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    position: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
    }).isRequired,
    style: StylePropType,
  }

  render() {
    return h('.context-menu', {
      className: this.props.className,
      style: this.props.style,
    }, [
      !this.props.isOpen ? null : h('.context-menu__overlay', {
        onClick: this.props.onRequestClose,
      }, [
        h('.context-menu__overlay__popup', {
          style: {
            transform: this.getTransform(),
          },
        }, [
          h('.context-menu__overlay__popup__list', [
            ...this.props.items.map(item => h('.context-menu__overlay__popup__list__item', {
              onClick: e => this.handleOverlayPopupListItemClick(item, e),
            }, [
              item.icon ? h(Icon, {
                className: 'context-menu__overlay__popup__list__item__icon',
                icon: item.icon,
              }) : null,
              h('.context-menu__overlay__popup__list__item__text', [item.text]),
            ])),
          ]),
        ]),
      ]),
    ]);
  }

  getTransform() {
    const x = _.clamp(this.props.position.x, 0, window.innerWidth - 202);
    const popupHeight = 16 + (this.props.items.length * 48);
    const y = _.clamp(this.props.position.y, 0, window.innerHeight - popupHeight);
    return `translate(${x}px, ${y}px)`;
  }

  handleOverlayPopupListItemClick = (item, e) => {
    if (!this.props.onSelect) return;
    this.props.onSelect(item);
    e.stopPropagation();
  }
}
