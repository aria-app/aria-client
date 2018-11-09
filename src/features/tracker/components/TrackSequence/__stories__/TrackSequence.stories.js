import h from 'react-hyperscript';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { TrackSequenceBasics } from './TrackSequenceBasics.story';

storiesOf('TrackSequence', module)
  .addDecorator(withKnobs)
  .add('Basics', () => h(TrackSequenceBasics));
