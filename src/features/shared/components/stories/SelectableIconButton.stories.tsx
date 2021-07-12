import { Meta, Story } from '@storybook/react';
import EditIcon from 'mdi-react/EditIcon';

import {
  SelectableIconButton,
  SelectableIconButtonProps,
} from '../SelectableIconButton';

export default {
  component: SelectableIconButton,
  title: 'Shared/SelectableIconButton',
  argTypes: {
    icon: { control: false },
  },
} as Meta;

export const Default: Story<SelectableIconButtonProps> = ({ ...args }) => (
  <SelectableIconButton {...args} />
);

Default.args = {
  icon: <EditIcon />,
  isSelected: true,
};
