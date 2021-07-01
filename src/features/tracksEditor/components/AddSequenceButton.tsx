import { Box, IconButton, useThemeWithDefault } from 'aria-ui';
import AddIcon from 'mdi-react/AddIcon';
import { ReactElement, useCallback } from 'react';

export interface AddSequenceButtonProps {
  onClick: (position: number) => void;
  position: number;
}

export default function AddSequenceButton(
  props: AddSequenceButtonProps,
): ReactElement {
  const { onClick, position } = props;
  const theme = useThemeWithDefault();

  const handleClick = useCallback(() => {
    onClick?.(position);
  }, [onClick, position]);

  return (
    <Box
      onClick={handleClick}
      style={{ transform: `translateX(${position * 64}px)` }}
      sx={{
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        height: 64,
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        transition: 'transform 200ms ease',
        width: 64,
      }}
    >
      <IconButton
        color="brandSubtle"
        icon={<AddIcon />}
        sx={{ border: `2px solid ${theme.colors.brandSubtle}` }}
      />
    </Box>
  );
}
