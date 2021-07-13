import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';
import { useCallback, useRef, useState } from 'react';

import { Panner, PannerProps } from '../Panner';

export default {
  component: Panner,
  title: 'NotesEditor/Panner',
  argTypes: {
    scrollLeftEl: { control: false },
    scrollTopEl: { control: false },
  },
} as Meta;

export const Default: Story<PannerProps> = (args) => {
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
                background: 'linear-gradient(to bottom right, #f00, #00f)',
                height: '100%',
                position: 'relative',
                overflowX: 'visible',
              }}
              width={400}
            >
              <Box height={400} width={400} />
              <Panner
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

Default.args = {};
