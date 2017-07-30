import h from 'react-hyperscript';
import { storiesOf } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import { SlotsBasics } from './slots-basics.story';

storiesOf('Slots', module)
  .addDecorator(withKnobs)
  .add('Basics', () => h(SlotsBasics));
