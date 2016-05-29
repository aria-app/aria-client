import h from 'react-hyperscript';
import { compose, pure, setPropTypes } from 'recompose';
import shared from 'ducks/shared';
import { TracksContainer } from '../tracks-container/tracks-container';
import './tracker.scss';

const { IconButton, Toolbar } = shared.components;

const component = (props) =>
  h('.tracker', {
    style: props.style,
  }, [
    h(Toolbar, {
      leftItems: [
        h(IconButton, {
          icon: 'plus',
          onPress: () => console.log('Add!'),
        }),
        h(IconButton, {
          icon: 'pencil',
          onPress: () => console.log('Edit!'),
        }),
        h(IconButton, {
          icon: 'trash',
          onPress: () => console.log('Delete!'),
        }),
      ],
    }),
    h(TracksContainer),
  ]);

const composed = compose([
  pure,
  setPropTypes({
  }),
])(component);

export const Tracker = composed;
