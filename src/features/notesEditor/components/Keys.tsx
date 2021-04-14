import PropTypes from 'prop-types';
import React from 'react';

import Dawww from '../../../dawww';
import shared from '../../shared';
import Key from './Key';

const { Box } = shared.components;

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
    <Box
      sx={{
        borderColor: 'action.hover',
        borderStyle: 'solid',
        borderWidth: 2,
        borderBottomRightRadius: 1,
        borderTopRightRadius: 1,
        borderLeft: 0,
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
        width: 40,
      }}
    >
      {Dawww.SCALE.map((step) => (
        <Key
          isHoveredRow={getIsHoveredRow(step)}
          key={step.y}
          onMouseDown={handleKeyMouseDown}
          step={step}
          style={keyStyles[step.y]}
        />
      ))}
    </Box>
  );
}

export default React.memo(Keys);
