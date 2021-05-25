import React from 'react';

import { Box, BoxProps } from './Box';

export default React.forwardRef((props: BoxProps, ref) => (
  <Box
    ref={ref}
    sx={{ marginX: 'auto', maxWidth: '640px', width: '100%' }}
    {...props}
  />
));
