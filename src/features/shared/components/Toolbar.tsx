import { forwardRef, memo } from 'react';

import { Box, BoxProps } from './Box';

export type ToolbarPosition = 'bottom' | 'top';

export interface ToolbarProps extends BoxProps {
  position: ToolbarPosition;
}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>((props, ref) => {
  const { position, sx = {}, ...rest } = props;

  return (
    <Box
      ref={ref}
      sx={{
        backgroundColor: 'background.paper',
        borderColor: 'divider',
        borderWidth: 2,
        height: ['bottom', 'top'].includes(position) ? 58 : 56,
        ...(position === 'top' ? { borderBottomStyle: 'solid' } : {}),
        ...(position === 'bottom' ? { borderTopStyle: 'solid' } : {}),
        padding: 2,
        ...sx,
      }}
      {...rest}
    />
  );
});

export default memo(Toolbar);
