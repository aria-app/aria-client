import styled from '@emotion/styled';
import { Story } from '@storybook/react';

import Divider, { DividerProps } from '../Divider';

const Root = styled.div({
  maxWidth: 320,
  width: '100vw',
});

export const DividerDefault: Story<DividerProps> = (args) => (
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
