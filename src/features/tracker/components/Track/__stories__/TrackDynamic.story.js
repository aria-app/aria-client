import React from 'react';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
import shared from '../../../../shared';
import { Track } from '../Track';

const { Shell } = shared.components;

export class TrackDynamic extends React.Component {
  state = {
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
            },
            {
              id: '1',
              points: [
                { x: 4, y: 14 },
                { x: 5, y: 14 },
              ],
            },
          ],
          position: 1,
          trackId: '0',
        },
      ],
      voice: 'SQUARE',
      volume: -5,
    },
  };

  render() {
    return (
      <Shell
        style={{
          alignItems: 'flex-start',
          padding: 16,
        }}>
        <div>
          <Track
            index={number('index', 0)}
            onSequenceAdd={action('onSequenceAdd')}
            onSequenceEdit={this.handleSequenceEdit}
            onSequenceOpen={action('onSequenceOpen')}
            onSequenceSelect={action('onSequenceSelect')}
            onSequencesOrderChange={action('onSequencesOrderChange')}
            onTrackIsMutedToggle={action('onTrackIsMutedToggle')}
            onTrackIsSoloingToggle={action('onTrackIsSoloingToggle')}
            onTrackSelect={action('onTrackSelect')}
            songMeasureCount={number('songMeasureCount', 4)}
            track={this.state.track}
          />
        </div>
      </Shell>
    );
  }

  handleSequenceEdit = (editedSequence) => {
    this.setState(state => ({
      track: {
        ...state.track,
        sequences: state.track.sequences.map((sequence) => {
          if (sequence.id === editedSequence.id) return editedSequence;

          return sequence;
        }),
      },
    }));
  };
}
