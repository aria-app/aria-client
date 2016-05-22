import h from 'react-hyperscript';
import { compose, setDisplayName } from 'recompose';
import sequence from 'ducks/sequence';
import './app.scss';

const { SequenceContainer } = sequence.components;

const component = () => h('.app', [
  h(SequenceContainer),
]);

const composed = compose([
  setDisplayName('App'),
])(component);

export const App = composed;
