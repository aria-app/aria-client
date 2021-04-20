import React from 'react';

import Box from './Box';

export default React.forwardRef((props: any, ref) => (
  <Box
    ref={ref}
    sx={{ marginX: 'auto', maxWidth: '640px', width: '100%' }}
    {...props}
  />
));
