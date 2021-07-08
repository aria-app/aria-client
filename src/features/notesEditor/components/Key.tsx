import { Box, Text, useThemeWithDefault } from 'aria-ui';
import * as CSS from 'csstype';
import includes from 'lodash/fp/includes';
import { FC, memo, useCallback } from 'react';

import { ScaleStep } from '../../../types';

export interface KeyProps {
  isHoveredRow: boolean;
  onPress: (step: ScaleStep) => void;
  step: ScaleStep;
  style: CSS.Properties<number | string>;
}

export const Key: FC<KeyProps> = memo((props) => {
  const { isHoveredRow, onPress, step, style } = props;
  const theme = useThemeWithDefault();

  const handleMouseDown = useCallback(() => {
    onPress(step);
  }, [onPress, step]);

  const isCKey = includes('C', step.name) && !includes('#', step.name);
  const isSharp = includes('#', step.name);

  return (
    <Box
      backgroundColor={isSharp ? 'textSecondary' : 'backgroundContrast'}
      onMouseDown={handleMouseDown}
      style={style}
      sx={{
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        height: 40,
        justifyContent: 'center',
        position: 'relative',
        '&::after': {
          backgroundColor: theme.colors.brandPrimary,
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
      {isCKey && <Text color="textSecondary">{step.name}</Text>}
    </Box>
  );
});
