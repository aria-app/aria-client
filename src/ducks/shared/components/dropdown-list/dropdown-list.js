import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes, withHandlers, withState } from 'recompose';
import { Button } from '../button/button';
import './dropdown-list.scss';

const component = ({
  closePopup,
  isOpen,
  openPopup,
  items,
  selectedItem,
  select,
  text,
}) => h('.dropdown-list', [
  h(Button, {
    className: 'dropdown-list__button',
    onPress: () => openPopup(),
    text: text || selectedItem.text || '',
  }),
  !isOpen ? null : h('.dropdown-list__overlay', {
    onClick: () => closePopup(),
  }),
  !isOpen ? null : h('.dropdown-list__popup', {
    style: {
      height: items.length * 48 + 16,
    },
  }, [
    h('.dropdown-list__popup__list', [
      ...items.map(item => h('.dropdown-list__popup__item', {
        className: classnames({
          'dropdown-list__popup__item--active': item === selectedItem,
        }),
        onClick: () => select(item),
      }, [
        item.text,
      ])),
    ]),
  ]),
]);

export const DropdownList = compose([
  pure,
  setPropTypes({
    items: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func,
    selectedId: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    selectedItem: React.PropTypes.object,
    text: React.PropTypes.string,
  }),
  mapProps(props => ({
    ...props,
    selectedItem: (() => {
      const sel = getSelectedItem(props);
      console.log(sel);
      return sel;
    })(),
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
])(component);

function getSelectedItem(props) {
  if (props.selectedItem) {
    return props.selectedItem;
  } else if (props.selectedId !== undefined) {
    return _.find(props.items, { id: props.selectedId });
  }

  return undefined;
}
