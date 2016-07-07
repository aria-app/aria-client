import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import shared from '../../../shared';
import './context-menu.scss';

const { Icon } = shared.components;

const component = (props) => h('.context-menu', {
  className: props.className,
  style: props.style,
}, [
  !props.isOpen ? null : h('.context-menu__overlay', {
    onClick: props.onRequestClose,
  }, [
    h('.context-menu__popup', {
      style: {
        transform: props.transform,
      },
    }, [
      h('.context-menu__popup__list', [
        ...props.items.map(item => h('.context-menu__popup__item', {
          onClick: (e) => props.selectItem(item, e),
        }, [
          item.icon ? h(Icon, {
            className: 'context-menu__popup__item__icon',
            icon: item.icon,
          }) : null,
          h('.context-menu__popup__item__text', [item.text]),
        ])),
      ]),
    ]),
  ]),
]);

export const ContextMenu = compose(
  setDisplayName('ContextMenu'),
  pure,
  setPropTypes({
    isOpen: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    position: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
    }).isRequired,
  }),
  mapProps((props) => ({
    ...props,
    transform: getTransform(props.items, props.position),
  })),
  withHandlers({
    selectItem: (props) => (item, e) => {
      props.onSelect(item);
      e.stopPropagation();
    },
  }),
)(component);

function getTransform(items, position) {
  const x = _.clamp(position.x, 0, window.innerWidth - 202);
  const popupHeight = 16 + items.length * 48;
  const y = _.clamp(position.y, 0, window.innerHeight - popupHeight);
  return `translate(${x}px, ${y}px)`;
}
