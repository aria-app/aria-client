import h from 'react-hyperscript';
import { compose, setDisplayName } from 'recompose';
import sequencer from 'ducks/sequencer';
import './app.scss';

const { SequencerContainer } = sequencer.components;

const component = () => h('.app', [
  h(SequencerContainer),
]);

const composed = compose([
  setDisplayName('App'),
])(component);

export const App = composed;
