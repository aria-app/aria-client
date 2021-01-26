import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

const Root = styled.hr((props) => ({
  backgroundColor: props.theme.palette.divider,
  border: 0,
  height: props.thickness === 'thin' ? 1 : 2,
}));

Divider.propTypes = {
  thickness: PropTypes.oneOf(['regular', 'thin']),
};

export default function Divider(props) {
  return <Root {...props} />;
}
