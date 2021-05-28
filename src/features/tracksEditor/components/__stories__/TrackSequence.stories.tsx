import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { TrackSequenceBasics } from './TrackSequenceBasics.story';

storiesOf('TrackSequence', module)
  .addDecorator(withKnobs)
  .add('Basics', () => <TrackSequenceBasics />);
