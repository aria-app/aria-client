import noop from 'lodash/fp/noop';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';

const Background = styled.div({
  flex: '1 0 auto',
});

const IconWrapper = styled.div({
  position: 'absolute',
});

const Root = styled.div(({ isActive, isDisabled, theme }) => ({
  alignItems: 'stretch',
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  flex: '0 0 auto',
  flexDirection: 'column',
  height: 40,
  position: 'relative',
  transform: 'scale(1)',
  transition: 'transform 200ms ease',
  width: 40,
  '&:hover': {
    transform: isActive || isDisabled ? 'none' : 'scale(1.2)',
  },
  '&:active': {
    transform: isActive || isDisabled ? 'none' : 'scale(0.9)',
  },
  [Background]: {
    backgroundColor: isActive ? theme.palette.action.selected : undefined,
  },
  [IconWrapper]: {
    opacity: isDisabled ? 0.5 : 1,
  },
}));

IconButton.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  iconProps: PropTypes.object,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'regular', 'large']),
};

function IconButton(props) {
  const {
    color,
    icon,
    iconProps = {},
    isActive,
    isDisabled,
    onClick,
    size,
    ...rest
  } = props;

  return (
    <Root
      isActive={isActive}
      isDisabled={isDisabled}
      onClick={isDisabled ? noop : onClick}
      {...rest}
    >
      <Background />
      <IconWrapper>
        <Icon color={color} icon={icon} size={size} {...iconProps} />
      </IconWrapper>
    </Root>
  );
}

export default React.memo(IconButton);
