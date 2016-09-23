import h from 'react-hyperscript';
import { storiesOf } from '@kadira/storybook';
import { text, withKnobs } from '@kadira/storybook-addon-knobs';
import { Button } from './button';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addDecorator(story => h('div.app', {
    style: {
      alignItems: 'flex-start',
    },
  }, [story()]))
  .add('Basics', () => h(Button, {
    text: text('Text', 'some text'),
  }));
