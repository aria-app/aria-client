import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Dawww from '../../../dawww';
import Key from './Key';

const Root = styled.div(({ theme }) => ({
  border: `2px solid ${theme.palette.action.hover}`,
  borderBottomRightRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  borderLeft: 0,
  display: 'flex',
  flex: '0 0 auto',
  flexDirection: 'column',
  width: 40,
}));

// TODO: Try moving this into the Key component.
const keyStyles = Dawww.SCALE.reduce((acc, currentStep) => {
  return {
    ...acc,
    [currentStep.y]: {
      borderBottomRightRadius:
        currentStep.y === Dawww.SCALE.length - 1 ? 4 : '',
      borderTopRightRadius: currentStep.y === 0 ? 4 : '',
    },
  };
}, {});

Keys.propTypes = {
  hoveredRow: PropTypes.number,
  onKeyPress: PropTypes.func,
};

function Keys(props) {
  const { hoveredRow, onKeyPress } = props;

  const getIsHoveredRow = React.useCallback((step) => step.y === hoveredRow, [
    hoveredRow,
  ]);

  const handleKeyMouseDown = React.useCallback(
    (step) => {
      onKeyPress(step.y);
    },
    [onKeyPress],
  );

  return (
    <Root>
      {Dawww.SCALE.map((step) => (
        <Key
          isHoveredRow={getIsHoveredRow(step)}
          key={step.y}
          onMouseDown={handleKeyMouseDown}
          step={step}
          style={keyStyles[step.y]}
        />
      ))}
    </Root>
  );
}

export default React.memo(Keys);
