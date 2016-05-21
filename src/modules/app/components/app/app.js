import h from 'react-hyperscript';
import { compose, setDisplayName } from 'recompose';
import sequence from 'modules/sequence';
import './app.scss';

const { Sequence } = sequence.components;

const component = () => h('.app', [
  h(Sequence),
]);

const composed = compose([
  setDisplayName('App'),
])(component);

export const App = composed;
