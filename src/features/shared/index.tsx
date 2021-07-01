import * as components from './components';
import * as constants from './constants';
import * as helpers from './helpers';
import theme from './theme';

export * from './components';
export * from './helpers';
export { default as theme } from './theme';

const shared = {
  components,
  constants,
  helpers,
  theme,
};

export default shared;
