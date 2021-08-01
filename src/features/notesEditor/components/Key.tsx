import { Box, Text, useThemeWithDefault } from 'aria-ui';
import includes from 'lodash/fp/includes';
import { FC, memo, useCallback, useMemo } from 'react';

export interface KeyProps {
  isHoveredRow: boolean;
  onPress: (step: number) => void;
  step: number;
  totalKeyCount: number;
}

export const Key: FC<KeyProps> = memo((props) => {
  const { isHoveredRow, onPress, step, totalKeyCount } = props;
  const theme = useThemeWithDefault();

  const handleMouseDown = useCallback(() => {
    onPress(step);
  }, [onPress, step]);

  const name = useMemo(() => {
    const letter = [
      'B',
      'A#',
      'A',
      'G#',
      'G',
      'F#',
      'F',
      'E',
      'D#',
      'D',
      'C#',
      'C',
    ][step % 12];
    const octave = Math.floor(step / 12);
    const totalOctaves = Math.ceil(totalKeyCount / 12);

    return `${letter}${totalOctaves - octave}`;
  }, [step, totalKeyCount]);

  const isCKey = includes('C', name) && !includes('#', name);
  const isSharp = includes('#', name);

  return (
    <Box
      backgroundColor={isSharp ? 'textSecondary' : 'backgroundContrast'}
      isInteractive
      onMouseDown={handleMouseDown}
      style={{
        borderBottomRightRadius:
          step === totalKeyCount - 1 ? theme.borderRadii.md - 2 : undefined,
        borderTopRightRadius: step === 0 ? theme.borderRadii.md - 2 : undefined,
      }}
      sx={{
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        height: 40,
        justifyContent: 'center',
        position: 'relative',
        '&::before': {
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
      width={10}
    >
      {isCKey && <Text color="textSecondary">{name}</Text>}
    </Box>
  );
});
