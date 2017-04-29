import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import { showIf } from '../../helpers';
import { Button } from '../button/button';
import { Toolbar } from '../toolbar/toolbar';
import './modal.scss';

export class Modal extends React.PureComponent {
  static propTypes = {
    cancelText: React.PropTypes.string,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    confirmText: React.PropTypes.string,
    isOpen: React.PropTypes.bool,
    onCancel: React.PropTypes.func,
    onConfirm: React.PropTypes.func,
    style: StylePropType,
    titleText: React.PropTypes.string,
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
