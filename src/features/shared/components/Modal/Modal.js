import PropTypes from 'prop-types';
import React from 'react';
import { showIf } from 'react-render-helpers';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components/macro';
import { Button } from '../Button/Button';
import { Toolbar } from '../Toolbar/Toolbar';

const ModalContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  align-items: center;
  display: flex;
  height: 56px;
  padding-left: ${props => props.theme.margin.m}px;
  padding-right: ${props => props.theme.margin.m}px;
  background-color: ${props => props.theme.greystone};
  border-bottom: 1px solid ${props => props.theme.midgray};
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
`;

const ModalOverlay = styled(animated.div)`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
`;

const ModalWindow = styled(animated.div)`
  background-color: ${props => props.theme.almostblack};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
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
  display: flex;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 300;
`;

export function Modal(props) {
  const transition = useTransition(props.isOpen, null, {
    config: {
      clamp: true,
      tension: 200,
    },
    from: {
      marginTop: 720,
      opacity: 0,
    },
    enter: {
      marginTop: 0,
      opacity: 1,
    },
    leave: {
      marginTop: 720,
      opacity: 0,
    },
  });

  return transition.map(({ item, key, props: animation }) => (item &&
    <StyledModal
      key={key}
      style={{ ...props.style }}>
      <ModalOverlay
        onClick={props.onClickOutside}
        style={{
          opacity: animation.opacity,
        }}
      />
      <ModalWindow
        style={animation}>
        <ModalHeader>
          {props.titleText}
        </ModalHeader>
        <ModalContent>
          {props.children}
        </ModalContent>
        {showIf(props.onConfirm)(
          <Toolbar
            className="modal__window__actions"
            rightItems={<React.Fragment>
              {showIf(props.onCancel)(
                <Button
                  onClick={props.onCancel}>
                  {props.cancelText}
                </Button>
              )}
              <Button
                onClick={props.onConfirm}>
                {props.confirmText}
              </Button>
            </React.Fragment>}
          />
        )}
      </ModalWindow>
    </StyledModal>
  ));
}

Modal.propTypes = {
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
};

Modal.defaultProps = {
  cancelText: 'cancel',
  confirmText: 'confirm',
};
