import { Box } from 'aria-ui';
import { range } from 'lodash';
import { FC, memo, useCallback } from 'react';

import { Key } from './Key';

export interface KeysProps {
  hoveredRow?: number;
  octaveCount: number;
  onKeyPress: (step: number) => void;
}

export const Keys: FC<KeysProps> = memo((props) => {
  const { hoveredRow, octaveCount, onKeyPress } = props;

  const totalKeyCount = octaveCount * 12;

  const getIsHoveredRow = useCallback(
    (step) => step === hoveredRow,
    [hoveredRow],
  );

  const handleKeyPress = useCallback(
    (step) => {
      onKeyPress(step);
    },
    [onKeyPress],
  );

  return (
    <Box
      borderBottomRightRadius="md"
      borderColor="border"
      borderTopRightRadius="md"
      borderWidth={2}
      sx={{
        borderLeft: 0,
        flexShrink: 0,
      }}
    >
      {range(0, totalKeyCount).map((n) => (
        <Key
          isHoveredRow={getIsHoveredRow(n)}
          key={n}
          onPress={handleKeyPress}
          step={n}
          totalKeyCount={totalKeyCount}
        />
      ))}
    </Box>
  );
});
