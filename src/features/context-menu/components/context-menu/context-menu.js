import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import shared from '../../../shared';
import './context-menu.scss';

const { Icon } = shared.components;
const { showIf } = shared.helpers;

export class ContextMenu extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    isOpen: React.PropTypes.bool.isRequired,
    items: React.PropTypes.arrayOf(
      React.PropTypes.object,
    ).isRequired,
    onIsOpenChange: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    position: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
    }).isRequired,
    style: StylePropType,
    windowHeight: React.PropTypes.number.isRequired,
    windowWidth: React.PropTypes.number.isRequired,
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
              ...this.props.items.map(item => h('.context-menu__overlay__popup__list__item', {
                onClick: e => this.handleOverlayPopupListItemClick(item, e),
              }, [
                showIf(item.icon)(
                  h(Icon, {
                    className: 'context-menu__overlay__popup__list__item__icon',
                    icon: item.icon,
                  }),
                ),
                h('.context-menu__overlay__popup__list__item__text', [
                  item.text,
                ]),
              ])),
            ]),
          ]),
        ]),
      ),
    ]);
  }

  getOverlayPopupStyle() {
    const x = _.clamp(
      this.props.position.x,
      0,
      this.props.windowWidth - 202,
    );
    const popupHeight = 16 + (this.props.items.length * 48);
    const y = _.clamp(
      this.props.position.y,
      0,
      this.props.windowHeight - popupHeight,
    );
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
