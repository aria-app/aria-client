import { IconButton, IconButtonProps, mergeSX } from 'aria-ui';
import { forwardRef } from 'react';

export interface SelectableIconButtonProps extends IconButtonProps {
  isSelected?: boolean;
}

export const SelectableIconButton = forwardRef<
  HTMLButtonElement,
  SelectableIconButtonProps
>((props, ref) => {
  const { isSelected, sx, ...rest } = props;
  return (
    <IconButton
      borderColor={isSelected ? 'brandPrimary' : 'transparent'}
      borderWidth={2}
      color={isSelected ? 'brandPrimary' : undefined}
      padding={1.5}
      ref={ref}
      sx={mergeSX({ label: 'SelectableIconButton' }, sx)}
      {...rest}
    />
  );
});
