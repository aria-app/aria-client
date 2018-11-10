import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
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
    return (
      <div
        className={this.getClassName()}
        style={this.getStyle()}>
        <div
          className="modal__overlay">
          <div
            className="modal__overlay__window">
            <div
              className="modal__overlay__window__header">
              <div
                className="modal__overlay__window__header__text">
                {this.props.titleText}
              </div>
            </div>
            <div
              className="modal__overlay__window__content">
              {this.props.children}
            </div>
            <Toolbar
              className="modal__overlay__window__actions"
              rightItems={<React.Fragment>
                {showIf(this.props.onCancel)(
                  <Button
                    className="modal__overlay__window__actions__action modal__overlay__window__actions__action--cancel"
                    text={this.props.cancelText}
                    onClick={this.props.onCancel}
                  />
                )}
                <Button
                  className="modal__overlay__window__actions__action modal__overlay__window__actions__action--confirm"
                  text={this.props.confirmText}
                  onClick={this.props.onConfirm}
                />
              </React.Fragment>}
            />
          </div>
        </div>
      </div>
    );
  }

  getClassName = () =>
    classnames('modal', this.props.className);

  getStyle = () => ({
    ...this.props.style,
    display: this.props.isOpen ? 'flex' : 'none',
  });
}
