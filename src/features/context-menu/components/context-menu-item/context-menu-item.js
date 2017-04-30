import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import shared from '../../../shared';
import './context-menu-item.scss';

const { Icon } = shared.components;
const { showIf } = shared.helpers;

export class ContextMenuItem extends React.PureComponent {
  static propTypes = {
    className: React.PropTypes.string,
    item: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    style: StylePropType,
  }

  render() {
    return h('.context-menu__overlay__popup__list__item', {
      className: this.props.className,
      onClick: this.handleClick,
      style: this.props.style,
    }, [
      showIf(this.props.item.icon)(
        h(Icon, {
          className: 'context-menu__overlay__popup__list__item__icon',
          icon: this.props.item.icon,
        }),
      ),
      h('.context-menu__overlay__popup__list__item__text', [
        this.props.item.text,
      ]),
    ]);
  }

  handleClick = e =>
    this.props.onClick(this.props.item, e);
}
