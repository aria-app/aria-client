import includes from 'lodash/fp/includes';
import PropTypes from 'prop-types';
import React from 'react';
import showIf from 'react-render-helpers/showIf';

import shared from '../../shared';

const { Box } = shared.components;

Key.propTypes = {
  isHoveredRow: PropTypes.bool,
  onMouseDown: PropTypes.func,
  step: PropTypes.object,
  style: PropTypes.object,
};

function Key(props) {
  const { isHoveredRow, onMouseDown, step, style } = props;

  const handleMouseDown = React.useCallback(() => {
    onMouseDown(step);
  }, [onMouseDown, step]);

  const isCKey = includes('C', step.name) && !includes('#', step.name);
  const isSharp = includes('#', step.name);

  return (
    <Box
      onMouseDown={handleMouseDown}
      style={style}
      sx={{
        alignItems: 'center',
        backgroundColor: isSharp ? 'text.secondary' : 'background.paper',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        height: 40,
        justifyContent: 'center',
        position: 'relative',
        '&::after': {
          backgroundColor: 'primary.main',
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
      }}
    >
      {showIf(isCKey)(
        <Box component="label" sx={{ color: 'text.hint' }}>
          {step.name}
        </Box>,
      )}
    </Box>
  );
}

export default React.memo(Key);
