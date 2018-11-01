import h from 'react-hyperscript';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { TrackDynamic } from './TrackDynamic.story';

storiesOf('Track', module)
  .addDecorator(withKnobs)
  .add('Dynamic', () => h(TrackDynamic));
