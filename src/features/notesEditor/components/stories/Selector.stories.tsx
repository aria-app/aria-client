import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';
import { useCallback, useRef, useState } from 'react';

import { Selector, SelectorProps } from '../Selector';

export default {
  component: Selector,
  title: 'NotesEditor/Selector',
  argTypes: {
    scrollLeftEl: { control: false },
    scrollTopEl: { control: false },
  },
} as Meta;

export const Default: Story<SelectorProps> = (args) => {
  const scrollLeftElRef = useRef<HTMLDivElement>(null);
  const [scrollTopEl, setScrollTopEl] = useState<HTMLDivElement | null>(null);

  const handleScrollTopElChange = useCallback((ref: HTMLDivElement) => {
    setScrollTopEl(ref);
  }, []);

  return (
    <Box
      height={100}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
      width={100}
    >
      <Box
        backgroundColor="backgroundContrast"
        borderRadius="md"
        ref={handleScrollTopElChange}
        sx={{
          display: 'flex',
          flex: '1 1 0',
          flexDirection: 'column',
          overflowX: 'hidden',
          overflowY: 'scroll',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: '1 0 auto',
          }}
        >
          <Box
            ref={scrollLeftElRef}
            sx={{
              overflowX: 'scroll',
              overflowY: 'visible',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(to bottom right, #fff, #000)',
                height: '100%',
                position: 'relative',
                overflowX: 'visible',
              }}
              width={200}
            >
              <Box height={200} width={200} />
              <Selector
                {...args}
                scrollLeftEl={scrollLeftElRef.current}
                scrollTopEl={scrollTopEl}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Default.args = {
  isEnabled: true,
};
