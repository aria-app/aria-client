import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { borderRadii, colors } from '../../constants';
import { Box } from '../Box';

export const BoxDefault = (args: Record<string, any>): ReactElement => {
  const { t } = useTranslation();
  return (
    <Box {...args}>
      {t('An easy-to-use music sequencer inspired by Little Big Planet.')}
    </Box>
  );
};

const getSpacingArgType = (name) => ({
  control: {
    type: 'select',
  },
  name,
  options: [2, 4, 6, 8, 10, 12],
});

export default {
  title: 'Box',
  component: Box,
  argTypes: {
    backgroundColor: {
      control: {
        type: 'select',
      },
      name: 'backgroundColor',
      options: colors,
    },
    borderRadius: {
      control: {
        type: 'select',
      },
      name: 'borderRadius',
      options: borderRadii,
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
    interactive: false,
    width: undefined,
  },
};
