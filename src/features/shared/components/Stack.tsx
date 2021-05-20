import { AnimatePresence } from 'framer-motion';
import flatten from 'lodash/fp/flatten';
import { Children, ElementType, Fragment, ReactElement } from 'react';

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

export default function Stack(props: StackProps): ReactElement {
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

  return (
    <Box
      as={component}
      sx={{
        display: 'flex',
        flexDirection: direction,
        '& > * + *': {
          [{
            column: 'marginTop',
            'column-reverse': 'marginBottom',
            row: 'marginLeft',
            'row-reverse': 'marginRight',
          }[direction]]: space,
        },
        ...sx,
      }}
      {...rest}
    >
      <Wrapper {...(animate ? { initial: false } : {})}>
        {flatten(
          Children.map(children, (child, index) =>
            showDividers && index
              ? [<Divider thickness={dividerThickness} />, child]
              : [child],
          ),
        )}
      </Wrapper>
    </Box>
  );
}
