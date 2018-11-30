import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { showIf } from 'react-render-helpers';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { Toolbar } from '../Toolbar/Toolbar';

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  padding: ${props => props.theme.margin.m}px;
`;

const ModalHeader = styled.div`
  align-items: center;
  display: flex;
  height: 56px;
  padding-left: ${props => props.theme.margin.m}px;
  padding-right: ${props => props.theme.margin.m}px;
  background-color: ${props => props.theme.ashgray};
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
`;

const ModalOverlay = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.50);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
`;

const ModalWindow = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  left: 50%;
  max-height: 480px;
  max-width: 640px;
  min-height: 0;
  min-width: 320px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledModal = styled.div`
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 300;
`;

export class Modal extends React.PureComponent {
  static propTypes = {
    cancelText: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    confirmText: PropTypes.string,
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    onClickOutside: PropTypes.func,
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
      <StyledModal
        style={this.getStyle()}>
        <ModalOverlay
          onClick={this.props.onClickOutside}
        />
        <ModalWindow>
          <ModalHeader>
            {this.props.titleText}
          </ModalHeader>
          <ModalContent>
            {this.props.children}
          </ModalContent>
          {showIf(this.props.onConfirm)(
            <Toolbar
              className="modal__window__actions"
              rightItems={<React.Fragment>
                {showIf(this.props.onCancel)(
                  <Button
                    onClick={this.props.onCancel}>
                    {this.props.cancelText}
                  </Button>
                )}
                <Button
                  onClick={this.props.onConfirm}>
                  {this.props.confirmText}
                </Button>
              </React.Fragment>}
            />
          )}
        </ModalWindow>
      </StyledModal>
    );
  }

  getClassName = () =>
    classnames('modal', this.props.className);

  getStyle = () => ({
    ...this.props.style,
    display: this.props.isOpen ? 'flex' : 'none',
  });
}
