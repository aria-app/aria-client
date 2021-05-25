import * as CSS from 'csstype';
import includes from 'lodash/fp/includes';
import { memo, useCallback } from 'react';

import { ScaleStep } from '../../../types';
import shared from '../../shared';

const { Box } = shared.components;

export interface KeyProps {
  isHoveredRow: boolean;
  onPress: (step: ScaleStep) => void;
  step: ScaleStep;
  style: CSS.Properties<number | string>;
}

function Key(props: KeyProps) {
  const { isHoveredRow, onPress, step, style } = props;

  const handleMouseDown = useCallback(() => {
    onPress(step);
  }, [onPress, step]);

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
      {isCKey && (
        <Box component="label" sx={{ color: 'text.hint' }}>
          {step.name}
        </Box>
      )}
    </Box>
  );
}

export default memo(Key);
