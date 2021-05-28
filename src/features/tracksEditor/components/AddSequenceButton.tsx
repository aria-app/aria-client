import AddIcon from '@material-ui/icons/Add';
import { ReactElement, useCallback } from 'react';

import { Box, BoxProps, Button } from '../../shared';

export type AddSequenceButtonProps = BoxProps & {
  onClick: (position: number) => void;
  position: number;
};

export default function AddSequenceButton(
  props: AddSequenceButtonProps,
): ReactElement {
  const { onClick, position } = props;

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
      <Button
        color="primary.light"
        startIcon={<AddIcon />}
        sx={{ minWidth: 0 }}
      />
    </Box>
  );
}
