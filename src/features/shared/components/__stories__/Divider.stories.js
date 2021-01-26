import React from 'react';
import styled from 'styled-components';

import Divider from '../Divider';

const Root = styled.div({
  maxWidth: 320,
  width: '100vw',
});

export const DividerDefault = (args) => (
  <Root>
    <Divider {...args} />
  </Root>
);

export default {
  title: 'Divider',
  component: Divider,
  argTypes: {
    thickness: {
      control: {
        type: 'inline-radio',
        options: ['thin', 'regular'],
      },
    },
  },
  args: {
    thickness: 'regular',
  },
};
