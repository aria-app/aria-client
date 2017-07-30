import 'babel-polyfill';
import { configure } from '@kadira/storybook';
import '../src/features/app-effects/components/app/app.scss';
import '../src/styles/resets.scss';

// Disable back button
history.pushState(null, null, location.href);
window.onpopstate = () => {
  window.history.go(1);
};

const reqStory = require.context('../src/features', true, /.story.js$/);
const reqStories = require.context('../src/features', true, /.stories.js$/);

function loadStories() {
  reqStory.keys().forEach(filename => reqStory(filename));
  reqStories.keys().forEach(filename => reqStories(filename));
}

configure(loadStories, module);
