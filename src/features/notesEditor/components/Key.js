import styled from '@emotion/styled';
import includes from 'lodash/fp/includes';
import PropTypes from 'prop-types';
import React from 'react';
import showIf from 'react-render-helpers/showIf';

const Root = styled.div(({ isHoveredRow, isSharp, theme }) => ({
  alignItems: 'center',
  backgroundColor: isSharp
    ? theme.palette.text.secondary
    : theme.palette.background.paper,
  cursor: 'pointer',
  display: 'flex',
  flex: '0 0 auto',
  height: 40,
  justifyContent: 'center',
  position: 'relative',
  '&::after': {
    backgroundColor: theme.palette.primary.main,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    bottom: 0,
    content: "''",
    display: 'block',
    right: -4,
    opacity: isHoveredRow ? 1 : 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: 4,
  },
}));

const Label = styled.div(({ theme }) => ({
  color: theme.palette.text.hint,
}));

Key.propTypes = {
  isHoveredRow: PropTypes.bool,
  onMouseDown: PropTypes.func,
  step: PropTypes.object,
  style: PropTypes.object,
};

function Key(props) {
  const { isHoveredRow, onMouseDown, step, style } = props;

  const handleMouseDown = React.useCallback(() => onMouseDown(step), [
    onMouseDown,
    step,
  ]);

  const isCKey = includes('C', step.name) && !includes('#', step.name);

  return (
    <Root
      isHoveredRow={isHoveredRow}
      isSharp={includes('#', step.name)}
      onMouseDown={handleMouseDown}
      style={style}
    >
      {showIf(isCKey)(<Label>{step.name}</Label>)}
    </Root>
  );
}

export default React.memo(Key);
