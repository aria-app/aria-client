import { AnimatePresence } from 'framer-motion';
import flatten from 'lodash/fp/flatten';
import { Children, ElementType, forwardRef, Fragment } from 'react';

import { Spacing } from '../types';
import { Box, BoxProps } from './Box';
import Divider, { DividerThickness } from './Divider';

export type StackDirection =
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse';

export type StackProps = BoxProps & {
  animate?: boolean;
  component?: ElementType;
  direction?: StackDirection;
  dividerThickness?: DividerThickness;
  showDividers?: boolean;
  space?: Spacing;
};

const Stack = forwardRef<HTMLElement, StackProps>((props, ref) => {
  const {
    animate,
    children,
    component = 'div',
    direction = 'column',
    dividerThickness = 'thin',
    showDividers,
    space,
    sx = {},
    ...rest
  } = props;

  const Wrapper = animate ? AnimatePresence : Fragment;

  const spacingStyles = {
    [{
      column: 'marginTop',
      'column-reverse': 'marginBottom',
      row: 'marginLeft',
      'row-reverse': 'marginRight',
    }[direction]]: space,
  };

  return (
    <Box
      as={component}
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: direction,
        '& > * + *': spacingStyles,
        ...sx,
      }}
      {...rest}
    >
      <Wrapper {...(animate ? { initial: false } : {})}>
        {flatten(
          Children.map(children, (child, index) =>
            showDividers && index
              ? [
                  <Divider sx={spacingStyles} thickness={dividerThickness} />,
                  child,
                ]
              : [child],
          ),
        )}
      </Wrapper>
    </Box>
  );
});

export default Stack;
