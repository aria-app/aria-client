import { Children, ReactElement } from 'react';

import { Spacing } from '../types';
import { Box, BoxProps } from './Box';

export type InlineAlignX = 'center' | 'left' | 'right';
export type InlineAlignY = 'bottom' | 'center' | 'stretch' | 'top';

export type InlineProps = BoxProps & {
  align?: InlineAlignX;
  alignY?: InlineAlignY;
  isReversed?: boolean;
  space?: Spacing;
};

export function Inline(props: InlineProps): ReactElement {
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
        {Children.map(children, (child) => (
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
