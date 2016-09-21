import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setDisplayName, setPropTypes } from 'recompose';
import { Button } from '../button/button';
import { Toolbar } from '../toolbar/toolbar';
import './modal.scss';

const component = props => h('.modal', {
  className: props.className,
  style: {
    ...props.style,
    display: props.isOpen ? 'flex' : 'none',
  },
}, [
  h('.modal__overlay', [
    h('.modal__window', [
      h('.modal__header', null, [
        h('.modal__header__text', [
          props.titleText,
        ]),
      ]),
      h('.modal__content', null, props.children),
      h(Toolbar, {
        className: 'modal__actions',
        rightItems: [
          !!props.onCancel ? h(Button, {
            className: 'modal__action modal__action--cancel',
            text: props.cancelText,
            onPress: props.onCancel,
          }) : null,
          h(Button, {
            className: 'modal__action modal__action--confirm',
            text: props.confirmText,
            onPress: props.onConfirm,
          }),
        ],
      }),
    ]),
  ]),
]);

export const Modal = compose(
  setDisplayName('Modal'),
  pure,
  setPropTypes({
    cancelText: React.PropTypes.string,
    confirmText: React.PropTypes.string,
    isOpen: React.PropTypes.bool,
    onCancel: React.PropTypes.func,
    onConfirm: React.PropTypes.func,
    titleText: React.PropTypes.string,
  }),
  mapProps(props => ({
    ...props,
    cancelText: props.cancelText || 'cancel',
    confirmText: props.confirmText || 'confirm',
  })),
)(component);
