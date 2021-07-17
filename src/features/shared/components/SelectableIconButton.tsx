import { IconButton, IconButtonProps, mergeSX } from 'aria-ui';
import { forwardRef, HTMLAttributes } from 'react';

export interface SelectableIconButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'color'> {
  icon: IconButtonProps['icon'];
  isSelected?: boolean;
  sx?: IconButtonProps['sx'];
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
