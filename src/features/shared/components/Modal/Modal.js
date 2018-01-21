import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { showIf } from 'react-render-helpers';
import { Button } from '../Button/Button';
import { Toolbar } from '../Toolbar/Toolbar';
import './Modal.scss';

export class Modal extends React.PureComponent {
  static propTypes = {
    cancelText: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    confirmText: PropTypes.string,
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    style: PropTypes.object,
    titleText: PropTypes.string,
  }

  static defaultProps = {
    cancelText: 'cancel',
    confirmText: 'confirm',
  }

  render() {
    return h('.modal', {
      className: this.props.className,
      style: this.getStyle(),
    }, [
      h('.modal__overlay', [
        h('.modal__overlay__window', [
          h('.modal__overlay__window__header', [
            h('.modal__overlay__window__header__text', [
              this.props.titleText,
            ]),
          ]),
          h('.modal__overlay__window__content', {}, this.props.children),
          h(Toolbar, {
            className: 'modal__overlay__window__actions',
            rightItems: [
              showIf(!!this.props.onCancel)(
                h(Button, {
                  className: 'modal__overlay__window__actions__action modal__overlay__window__actions__action--cancel',
                  text: this.props.cancelText,
                  onClick: this.props.onCancel,
                }),
              ),
              h(Button, {
                className: 'modal__overlay__window__actions__action modal__overlay__window__actions__action--confirm',
                text: this.props.confirmText,
                onClick: this.props.onConfirm,
              }),
            ],
          }),
        ]),
      ]),
    ]);
  }

  getStyle() {
    return {
      ...this.props.style,
      display: this.props.isOpen ? 'flex' : 'none',
    };
  }
}
