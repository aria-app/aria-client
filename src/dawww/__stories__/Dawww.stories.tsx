import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { DawwwTesting } from './DawwwTesting.story';

storiesOf('Dawww', module)
  .addDecorator(withKnobs)
  .add('Testing', () => <DawwwTesting />);
