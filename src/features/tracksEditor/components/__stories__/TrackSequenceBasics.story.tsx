import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import shared from '../../../shared';
import TrackSequence from '../TrackSequence';

const { Shell } = shared.components;

export const TrackSequenceBasics = () => (
  <Shell
    style={{
      padding: 16,
    }}
  >
    <TrackSequence
      index={number('index', 0)}
      isSelected={boolean('isSelected', false)}
      onOpen={action('onOpen')}
      onSelect={action('onSelect')}
      onSequenceAdd={action('onSequenceAdd')}
      sequence={{
        id: '0',
        measureCount: number('sequence.measureCount', 1),
        notes: [
          {
            id: '0',
            points: [{ x: 2, y: 10 }, { x: 3, y: 10 }],
          },
          {
            id: '1',
            points: [{ x: 4, y: 14 }, { x: 5, y: 14 }],
          },
        ],
        position: 0,
        trackId: '0',
      }}
    />
  </Shell>
);
