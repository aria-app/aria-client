import MuiDivider, {
  DividerProps as MuiDividerProps,
} from '@material-ui/core/Divider';
import { forwardRef } from 'react';

export type DividerThickness = 'regular' | 'thin';

export interface DividerProps extends MuiDividerProps {
  thickness?: DividerThickness;
  sx?: any;
}

const Divider = forwardRef<HTMLHRElement, DividerProps>((props, ref) => {
  const { sx = {}, thickness, ...rest } = props;

  return (
    <MuiDivider
      ref={ref}
      sx={{
        borderBottomWidth: thickness === 'thin' ? 1 : 2,
        margin: 'initial',
        ...sx,
      }}
      {...rest}
    />
  );
});

export default Divider;
