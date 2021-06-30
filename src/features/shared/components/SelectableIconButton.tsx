import {
  IconButton,
  IconButtonProps,
  mergeSX,
  useThemeWithDefault,
} from 'aria-ui';
import { forwardRef } from 'react';

export interface SelectableIconButtonProps extends IconButtonProps {
  isSelected?: boolean;
}

export const SelectableIconButton = forwardRef<
  HTMLButtonElement,
  SelectableIconButtonProps
>((props, ref) => {
  const { isSelected, sx, ...rest } = props;
  const theme = useThemeWithDefault();

  const borderColor = isSelected
    ? theme.getColor('brandPrimary')
    : 'transparent';

  return (
    <IconButton
      color={isSelected ? 'brandPrimary' : undefined}
      ref={ref}
      sx={mergeSX(
        { border: `2px solid ${borderColor}`, label: 'SelectableIconButton' },
        sx,
      )}
      {...rest}
    />
  );
});
