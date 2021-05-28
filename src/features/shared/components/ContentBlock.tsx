import { forwardRef } from 'react';

import { Box, BoxProps } from './Box';

export default forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box
    ref={ref}
    sx={{ marginX: 'auto', maxWidth: '640px', width: '100%' }}
    {...props}
  />
));
