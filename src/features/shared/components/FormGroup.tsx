import isNil from 'lodash/fp/isNil';
import React from 'react';

import Stack from './Stack';
import Typography from './Typography';

const FormGroup = React.forwardRef((props: any, ref) => {
  const {
    children,
    fieldId,
    helperText,
    helperTextColor = 'text.secondary',
    label,
    space = 1,
    ...rest
  } = props;

  return (
    <Stack space={space} {...rest}>
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
});

export default React.memo(FormGroup);
