import { Box, IconButton } from 'aria-ui';
import AddIcon from 'mdi-react/AddIcon';
import { FC, useCallback } from 'react';

export interface AddSequenceButtonProps {
  onClick: (position: number) => void;
  position: number;
}

export const AddSequenceButton: FC<AddSequenceButtonProps> = (props) => {
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
      <IconButton
        borderColor="brandSubtle"
        borderWidth={2}
        color="brandSubtle"
        icon={<AddIcon />}
        sx={{ label: 'AddSequenceButton' }}
      />
    </Box>
  );
};
