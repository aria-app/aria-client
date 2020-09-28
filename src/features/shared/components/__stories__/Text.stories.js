import React from 'react';

import { colors, textVariants } from '../../constants';
import Text from '../Text';

export const TextDefault = (args) => <Text {...args}>{args.text}</Text>;

export default {
  title: 'Text',
  component: Text,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: colors,
      },
    },
    text: {
      control: {
        type: 'text',
      },
    },
    variant: {
      control: {
        type: 'select',
        options: textVariants,
      },
    },
  },
  args: {
    color: 'text',
    text: 'Some Text',
    variant: 'body',
  },
};
