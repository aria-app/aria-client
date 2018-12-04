import { configure } from '@storybook/react';
import '../src/styles/resets.css';

const req = require.context('../src/features', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
