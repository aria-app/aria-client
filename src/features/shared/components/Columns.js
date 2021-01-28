import includes from 'lodash/fp/includes';
import PropTypes from 'prop-types';
import React from 'react';

import { verticalAlignments } from '../constants';
import Box from './Box';

function getStylesFromWidth(width) {
  if (includes('/', width)) {
    const dividendAndDivisor = width.split('/').map(parseFloat);
    const percent = (dividendAndDivisor[0] / dividendAndDivisor[1]) * 100;
    return { flex: `0 0 ${percent}%` };
  }

  if (width === 'content') {
    return { flexShrink: 0 };
  }

  return { width: '100%' };
}

Columns.propTypes = {
  alignY: PropTypes.oneOf(verticalAlignments),
  isReversed: PropTypes.bool,
  space: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default function Columns(props) {
  const {
    alignY = 'top',
    children,
    isReversed,
    space,
    sx = {},
    ...rest
  } = props;

  return (
    <Box
      sx={{
        alignItems: {
          bottom: 'flex-end',
          center: 'center',
          stretch: 'stretch',
          top: 'flex-start',
        }[alignY],
        display: 'flex',
        flexDirection: isReversed && 'row-reverse',
        '& > * + *': {
          [`margin${isReversed ? 'Right' : 'Left'}`]: space,
        },
        ...sx,
      }}
      {...rest}
    >
      {React.Children.map(children, (child) => (
        <Box
          style={getStylesFromWidth(child && child.props.width)}
          sx={{
            alignItems: {
              bottom: 'flex-end',
              center: 'center',
              stretch: 'stretch',
              top: 'flex-start',
            }[alignY],
            display: 'flex',
          }}
        >
          {child}
        </Box>
      ))}
    </Box>
  );
}
