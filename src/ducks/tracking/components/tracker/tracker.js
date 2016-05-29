import h from 'react-hyperscript';
import { compose, pure, setPropTypes } from 'recompose';
import { TracksContainer } from '../tracks-container/tracks-container';
import './tracker.scss';

const component = (props) =>
  h('.tracker', {
    style: props.style,
  }, [
    h(TracksContainer),
  ]);

const composed = compose([
  pure,
  setPropTypes({
  }),
])(component);

export const Tracker = composed;
