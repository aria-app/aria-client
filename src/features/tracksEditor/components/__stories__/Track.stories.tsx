import { action } from '@storybook/addon-actions';
import React from 'react';

import TrackListTrack from '../TrackListTrack';

export const TrackDefault = (args) => <TrackListTrack {...args} />;

export default {
  title: 'TrackListTrack',
  component: TrackListTrack,
  args: {
    onSequenceAdd: action('onSequenceAdd'),
    onSequenceEdit: action('onSequenceEdit'),
    onSequenceOpen: action('onSequenceOpen'),
    onSequenceSelect: action('onSequenceSelect'),
    onTrackSelect: action('onTrackSelect'),
    songMeasureCount: 4,
    track: {
      id: '0',
      isMuted: false,
      isSoloing: false,
      sequences: [
        {
          id: '0',
          measureCount: 1,
          notes: [
            {
              id: '0',
              points: [
                { x: 2, y: 10 },
                { x: 3, y: 10 },
              ],
              sequenceId: '0',
            },
            {
              id: '1',
              points: [
                { x: 4, y: 14 },
                { x: 5, y: 14 },
              ],
              sequenceId: '0',
            },
          ],
          position: 1,
          trackId: '0',
        },
      ],
      voice: 'SQUARE',
      volume: -5,
    },
  },
};
