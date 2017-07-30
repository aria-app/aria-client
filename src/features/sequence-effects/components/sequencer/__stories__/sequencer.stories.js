import h from 'react-hyperscript';
import { storiesOf } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import { SequencerBasics } from './sequencer-basics.story';

storiesOf('Sequencer', module)
  .addDecorator(withKnobs)
  .add('Basics', () => h(SequencerBasics));
