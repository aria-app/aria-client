import h from 'react-hyperscript';
import sequence from 'modules/sequence';
import './app.scss';

const { Sequence } = sequence.components;

const component = () => h('.app', [
  h(Sequence),
]);

export const App = component;
