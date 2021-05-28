import * as CSS from 'csstype';
import { memo, useCallback } from 'react';

import Dawww from '../../../dawww';
import { ScaleStep } from '../../../types';
import shared from '../../shared';
import Key from './Key';

const { Box } = shared.components;

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

function Keys(props: KeysProps) {
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
          onPress={handleKeyPress}
          step={step}
          style={keyStyles[step.y]}
        />
      ))}
    </Box>
  );
}

export default memo(Keys);
