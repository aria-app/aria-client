import isNil from 'lodash/fp/isNil';
import React, { HTMLAttributes } from 'react';

import { Spacing } from '../types';
import Stack from './Stack';
import Typography from './Typography';

export interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  helperText?: string;
  helperTextColor?: string;
  label?: string;
  space?: Spacing;
}

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  (props, ref) => {
    const {
      children,
      helperText,
      helperTextColor = 'text.secondary',
      label,
      space = 1,
      ...rest
    } = props;

    return (
      <Stack ref={ref} space={space} {...rest}>
        {!isNil(label) && (
          <Typography component="label" variant="label">
            {label}
          </Typography>
        )}
        {children}
        {!isNil(helperText) && (
          <Typography
            component="caption"
            sx={{ color: helperTextColor }}
            variant="caption"
          >
            {helperText}
          </Typography>
        )}
      </Stack>
    );
  },
);

export default React.memo(FormGroup);
