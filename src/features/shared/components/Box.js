import { useTheme } from '@emotion/react';
import MuiBox from '@material-ui/core/Box';
import getOr from 'lodash/fp/getOr';
import { readableColor } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';

function getIsDarkColor(color) {
  return readableColor(color) === '#fff';
}

const Box = React.forwardRef((props, ref) => {
  const {
    interactive,
    interactiveColor: interactiveColorProp,
    sx = {},
    ...rest
  } = props;
  const theme = useTheme();

  const interactiveColor = React.useMemo(() => {
    if (!interactive) return;

    if (interactiveColorProp) {
      const resolvedInteractiveColor = getOr(
        undefined,
        `palette.${interactiveColorProp}`,
        theme,
      );
      if (resolvedInteractiveColor) {
        return resolvedInteractiveColor;
      }
    }

    const backgroundColor = getOr(
      theme.palette.background.default,
      `palette.${sx.backgroundColor}`,
      theme,
    );
    return readableColor(backgroundColor);
  }, [interactive, interactiveColorProp, sx, theme]);

  return (
    <MuiBox
      ref={ref}
      sx={{
        cursor: sx.cursor || (interactive && 'pointer'),
        overflow: sx.overflow || (interactive && 'hidden'),
        position: sx.position || (interactive && 'relative'),
        ...(interactive
          ? {
              '&::after': {
                backgroundColor: interactiveColor,
                bottom: 0,
                content: '""',
                display: interactive ? 'block' : 'none',
                left: 0,
                pointerEvents: 'none',
                position: 'absolute',
                right: 0,
                top: 0,
                opacity: 0,
                transition: 'opacity 100ms ease',
              },
              ':hover::after': {
                opacity: getIsDarkColor(interactiveColor) ? 0.1 : 0.2,
              },
              ':active::after': {
                opacity: getIsDarkColor(interactiveColor) ? 0.25 : 0.4,
              },
            }
          : {}),
        ...sx,
      }}
      {...rest}
    />
  );
});

Box.propTypes = {
  interactive: PropTypes.bool,
};

export default Box;
