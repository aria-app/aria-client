import PropTypes from 'prop-types';
import React from 'react';

import { verticalAlignments } from '../constants';
import Box from './Box';

Inline.propTypes = {
  align: PropTypes.oneOf(['center', 'left', 'right']),
  alignY: PropTypes.oneOf(verticalAlignments),
  isReversed: PropTypes.bool,
  space: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default function Inline(props: any) {
  const {
    align = 'left',
    alignY = 'top',
    children,
    space,
    sx = {},
    ...rest
  } = props;

  return (
    <Box sx={{ display: 'flex', ...sx }} {...rest}>
      <Box
        sx={{
          alignItems: {
            bottom: 'flex-end',
            center: 'center',
            stretch: 'stretch',
            top: 'flex-start',
          }[alignY],
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: {
            center: 'center',
            left: 'flex-start',
            right: 'flex-end',
          }[align],
          marginLeft: space ? -space : undefined,
          marginTop: space ? -space : undefined,
        }}
      >
        {React.Children.map(children, (child) => (
          <Box
            sx={{
              display: 'flex',
              paddingLeft: space,
              paddingRight: space,
            }}
          >
            {child}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
