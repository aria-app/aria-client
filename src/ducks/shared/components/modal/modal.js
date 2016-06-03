import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import { Button } from '../button/button';
import { Toolbar } from '../toolbar/toolbar';
import './modal.scss';

const component = ({
  cancelText,
  confirmText,
  children,
  className,
  isOpen,
  onCancelPress,
  onConfirmPress,
  style,
  titleText,
}) => h('.modal', {
  className,
  style: {
    ...style,
    display: isOpen ? 'flex' : 'none',
  },
}, [
  h('.modal__overlay'),
  h('.modal__window', [
    h('.modal__header', null, [
      h('.modal__header__text', [
        titleText,
      ]),
    ]),
    h('.modal__content', null, children),
    h(Toolbar, {
      className: 'modal__actions',
      rightItems: [
        h(Button, {
          className: 'modal__action',
          text: cancelText,
          onPress: onCancelPress,
        }),
        h(Button, {
          className: 'modal__action',
          text: confirmText,
          onPress: onConfirmPress,
        }),
      ],
    }),
  ]),
]);

export const Modal = compose([
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
  withHandlers({
    onCancelPress: (props) => () => {
      if (props.onCancel) props.onCancel();
    },
    onConfirmPress: (props) => () => {
      if (props.onConfirm) props.onConfirm();
    },
  }),
])(component);
