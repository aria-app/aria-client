import h from 'react-hyperscript';
import sequence from 'modules/sequence';
import './app.scss';

const { SequenceContainer } = sequence.components;

const component = () => h('.app', [
  h(SequenceContainer),
]);

export const App = component;
