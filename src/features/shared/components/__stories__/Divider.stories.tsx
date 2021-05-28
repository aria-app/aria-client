import styled from '@emotion/styled';

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
