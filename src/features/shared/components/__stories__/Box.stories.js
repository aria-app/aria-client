import React from 'react';

import { borderRadii, colors, spacingAliases } from '../../constants';
import Box from '../Box';

export const BoxDefault = (args) => <Box {...args}>Content</Box>;

const getSpacingArgType = (name) => ({
  control: {
    options: [2.5, ...spacingAliases],
    type: 'select',
  },
  name,
});

export default {
  title: 'Box',
  component: Box,
  argTypes: {
    backgroundColor: {
      name: 'backgroundColor',
      control: {
        type: 'select',
        options: colors,
      },
    },
    borderRadius: {
      name: 'borderRadius',
      control: {
        type: 'select',
        options: borderRadii,
      },
    },
    height: {
      name: 'height',
      control: {
        type: 'number',
      },
    },
    margin: getSpacingArgType('margin'),
    marginBottom: getSpacingArgType('marginBottom'),
    marginLeft: getSpacingArgType('marginLeft'),
    marginRight: getSpacingArgType('marginRight'),
    marginTop: getSpacingArgType('marginTop'),
    marginX: getSpacingArgType('marginX'),
    marginY: getSpacingArgType('marginY'),
    padding: getSpacingArgType('padding'),
    paddingBottom: getSpacingArgType('paddingBottom'),
    paddingLeft: getSpacingArgType('paddingLeft'),
    paddingRight: getSpacingArgType('paddingRight'),
    paddingTop: getSpacingArgType('paddingTop'),
    paddingX: getSpacingArgType('paddingX'),
    paddingY: getSpacingArgType('paddingY'),
    width: {
      name: 'width',
      control: {
        type: 'number',
      },
    },
  },
  args: {
    backgroundColor: undefined,
    borderRadius: undefined,
    component: 'div',
    height: undefined,
    width: undefined,
  },
};
