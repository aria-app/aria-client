import PropTypes from 'prop-types';
import React from 'react';

import { Box } from './Box';

const Toolbar = React.forwardRef((props: any, ref) => {
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

Toolbar.propTypes = {
  position: PropTypes.oneOf(['bottom', 'top']),
};

export default React.memo(Toolbar);
