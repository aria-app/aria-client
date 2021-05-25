import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';

import shared from '../../../shared';
import TrackListSequence from '../TrackListSequence';

const { Shell } = shared.components;

export const TrackSequenceBasics = () => (
  <Shell
    style={{
      padding: 16,
    }}
  >
    <TrackListSequence
      isDragging={boolean('isDragging', false)}
      isSelected={boolean('isSelected', false)}
      onOpen={action('onOpen')}
      onSelect={action('onSelect')}
      sequence={{
        id: 0,
        measureCount: number('sequence.measureCount', 1),
        notes: [
          {
            id: 0,
            points: [
              { x: 2, y: 10 },
              { x: 3, y: 10 },
            ],
            sequence: {
              id: 0,
            },
          },
          {
            id: 1,
            points: [
              { x: 4, y: 14 },
              { x: 5, y: 14 },
            ],
            sequence: {
              id: 0,
            },
          },
        ],
        position: 0,
        track: {
          id: 0,
        },
      }}
    />
  </Shell>
);
