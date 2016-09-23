import { configure } from '@kadira/storybook';
import '../src/features/app/components/app/app.scss';
import '../src/styles/resets.scss';

const req = require.context('../src/features', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
