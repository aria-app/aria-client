import { configure } from '@storybook/react';
import '../src/features/app/components/App/App.scss';
import '../src/styles/resets.scss';

const req = require.context('../src/features', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
