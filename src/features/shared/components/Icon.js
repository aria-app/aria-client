import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import icons from './icons';

const Root = styled.div(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flex: '0 0 auto',
  height: theme.spacing(10),
  justifyContent: 'center',
  width: theme.spacing(10),
}));

const Content = styled.div(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flex: '0 0 auto',
  height: theme.spacing(6),
  justifyContent: 'center',
  width: theme.spacing(6),
}));

Icon.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOf(Object.keys(icons).concat([''])),
  size: PropTypes.oneOf(['small', 'regular', 'large', '']),
};

function Icon(props) {
  const { color, icon, size, ...rest } = props;
  const theme = useTheme();

  const IconComponent = icons[icon];

  return (
    <Root {...rest}>
      <Content>
        <IconComponent
          color={color || (theme && theme.palette.action.active)}
          size={
            { large: theme.spacing(6), small: theme.spacing(3) }[size] ||
            theme.spacing(5)
          }
        />
      </Content>
    </Root>
  );
}

export default React.memo(Icon);
