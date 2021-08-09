import { Meta, Story } from '@storybook/react';
import { useCallback, useEffect, useState } from 'react';

import { Sequence, Track } from '../../../../types';
import { TrackListTrack, TrackListTrackProps } from '../TrackListTrack';

export default {
  component: TrackListTrack,
  title: 'TracksEditor/TrackListTrack',
} as Meta;

export const Default: Story<TrackListTrackProps> = (args) => (
  <TrackListTrack {...args} />
);

Default.args = {
  selectedSequenceId: 1,
  songMeasureCount: 4,
  track: {
    __typename: 'Track',
    id: 1,
    isMuted: false,
    isSoloing: false,
    position: 1,
    sequences: [
      {
        __typename: 'Sequence',
        id: 1,
        measureCount: 1,
        notes: [],
        position: 0,
        track: {
          __typename: 'Track',
          id: 1,
        },
      },
      {
        __typename: 'Sequence',
        id: 2,
        measureCount: 2,
        notes: [],
        position: 2,
        track: {
          __typename: 'Track',
          id: 1,
        },
      },
    ],
    song: {
      __typename: 'Song',
      id: 1,
    },
    voice: {
      __typename: 'Voice',
      id: 1,
      name: 'Voice',
      toneOscillatorType: 'voice',
    },
    volume: 1,
  },
};

export const EditableSequences: Story<TrackListTrackProps> = (args) => {
  const [track, setTrack] = useState<Track>(args.track);

  const handleSequenceEdit = useCallback<(changedSequence: Sequence) => void>(
    (changedSequence) => {
      const updatedTrack = {
        ...track,
        sequences: track.sequences.map((sequence) =>
          sequence.id === changedSequence.id ? changedSequence : sequence,
        ),
      };

      setTrack(updatedTrack);
    },
    [track],
  );

  useEffect(() => {
    setTrack(args.track);
  }, [args.track, setTrack]);

  return (
    <TrackListTrack
      {...args}
      onSequenceEdit={handleSequenceEdit}
      track={track}
    />
  );
};

EditableSequences.args = {
  ...Default.args,
};
