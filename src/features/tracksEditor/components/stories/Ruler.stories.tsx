import { Meta, Story } from '@storybook/react';
import { useCallback, useEffect, useState } from 'react';

import { Ruler, RulerMeasureCountChangeHandler, RulerProps } from '../Ruler';

export default {
  component: Ruler,
  title: 'TracksEditor/Ruler',
  argTypes: {
    onMeasureCountChange: { control: false },
  },
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const Default: Story<RulerProps> = (args) => <Ruler {...args} />;

Default.args = {
  measureCount: 4,
  measureWidth: 64,
};

export const Stateful: Story<RulerProps> = (args) => {
  const [measureCount, setMeasureCount] = useState(args.measureCount);

  const handleMeasureCountChange = useCallback<RulerMeasureCountChangeHandler>(
    (changedMeasureCount) => {
      setMeasureCount(changedMeasureCount);
      args.onMeasureCountChange?.(changedMeasureCount);
    },
    [args],
  );

  useEffect(() => {
    setMeasureCount(args.measureCount);
  }, [args.measureCount]);

  return (
    <Ruler
      {...args}
      measureCount={measureCount}
      onMeasureCountChange={handleMeasureCountChange}
    />
  );
};

Stateful.args = {
  ...Default.args,
};
