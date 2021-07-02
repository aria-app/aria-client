import { Box } from 'aria-ui';
import * as CSS from 'csstype';
import { FC, memo, useCallback } from 'react';

import { Dawww } from '../../../dawww';
import { ScaleStep } from '../../../types';
import { Key } from './Key';

// TODO: Try moving this into the Key component.
const keyStyles = Dawww.SCALE.reduce<
  Record<number, CSS.Properties<number | string>>
>((acc, currentStep) => {
  return {
    ...acc,
    [currentStep.y]: {
      borderBottomRightRadius:
        currentStep.y === Dawww.SCALE.length - 1 ? 4 : undefined,
      borderTopRightRadius: currentStep.y === 0 ? 4 : undefined,
    },
  };
}, {});

export interface KeysProps {
  hoveredRow?: number;
  onKeyPress: (step: ScaleStep) => void;
}

export const Keys: FC<KeysProps> = memo((props) => {
  const { hoveredRow, onKeyPress } = props;

  const getIsHoveredRow = useCallback(
    (step) => step.y === hoveredRow,
    [hoveredRow],
  );

  const handleKeyPress = useCallback(
    (step) => {
      onKeyPress(step.y);
    },
    [onKeyPress],
  );

  return (
    <Box
      borderColor="border"
      borderWidth={2}
      sx={{
        borderBottomRightRadius: 1,
        borderTopRightRadius: 1,
        borderLeft: 0,
        flexShrink: 0,
      }}
      width={10}
    >
      {Dawww.SCALE.map((step) => (
        <Key
          isHoveredRow={getIsHoveredRow(step)}
          key={step.y}
          onPress={handleKeyPress}
          step={step}
          style={keyStyles[step.y]}
        />
      ))}
    </Box>
  );
});
