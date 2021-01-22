import withTheme from '@material-ui/styles/withTheme';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import icons from './icons';

const Root = styled.div(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flex: '0 0 auto',
  height: theme.spacing(5),
  justifyContent: 'center',
  width: theme.spacing(5),
}));

const Content = styled.div(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flex: '0 0 auto',
  height: theme.spacing(3),
  justifyContent: 'center',
  width: theme.spacing(3),
}));

Icon.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOf(Object.keys(icons).concat([''])),
  size: PropTypes.oneOf(['small', 'regular', 'large', '']),
  theme: PropTypes.object,
};

function Icon(props) {
  const { color, icon, size, theme, ...rest } = props;

  const IconComponent = icons[icon];

  return (
    <Root {...rest}>
      <Content>
        <IconComponent
          color={color || (theme && theme.palette.action.active)}
          size={
            { large: theme.spacing(3), small: theme.spacing(1.5) }[size] ||
            theme.spacing(2.5)
          }
        />
      </Content>
    </Root>
  );
}

export default React.memo(withTheme(Icon));
