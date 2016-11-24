import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes, withHandlers, withState } from 'recompose';
import { Icon } from '../icon/icon';
import { IconButton } from '../icon-button/icon-button';
import './dropdown-list.scss';

const component = props => h('.dropdown-list', {
  style: props.style,
}, [
  props.icon ? h(IconButton, {
    className: 'dropdown-list__button',
    onPress: props.openPopup,
    icon: props.icon,
  }) : h('.dropdown-list__input', {
    onClick: props.openPopup,
  }, [
    props.text || props.selectedItem.text || '',
    h(Icon, {
      icon: 'caret-down',
      size: 'small',
    }),
  ]),
  !props.isOpen ? null : h('.dropdown-list__overlay', {
    onClick: props.closePopup,
  }),
  !props.isOpen ? null : h('.dropdown-list__popup', {
    style: {
      height: (props.items.length * 48) + 16,
    },
  }, [
    h('.dropdown-list__popup__list', [
      ...props.items.map(item => h('.dropdown-list__popup__item', {
        className: classnames({
          'dropdown-list__popup__item--active': item === props.selectedItem,
        }),
        onClick: () => props.select(item),
      }, [
        item.text,
      ])),
    ]),
  ]),
]);

export const DropdownList = compose(
  pure,
  setPropTypes({
    icon: React.PropTypes.string,
    items: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func,
    selectedId: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    selectedItem: React.PropTypes.object,
  }),
  mapProps(props => ({
    ...props,
    selectedItem: getSelectedItem(props),
    text: props.text || '',
  })),
  withState('isOpen', 'setIsOpen', false),
  withHandlers({
    closePopup: props => () => {
      props.setIsOpen(() => false);
    },
    openPopup: props => () => {
      props.setIsOpen(() => true);
    },
    select: props => (item) => {
      props.onSelect(item);
      props.setIsOpen(false);
    },
  }),
)(component);

function getSelectedItem(props) {
  if (props.selectedItem) {
    return props.selectedItem;
  } else if (props.selectedId || props.selectedId === 0) {
    return _.find(props.items, { id: props.selectedId });
  }

  return { text: props.text };
}
