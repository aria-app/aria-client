import { compose, pure, setDisplayName } from 'recompose';
import h from 'react-hyperscript';
import { TracksContainer } from '../tracks/tracks-container';
import { SongTimelineContainer } from '../song-timeline-container/song-timeline-container';
import { TrackerToolbarContainer } from '../tracker-toolbar/tracker-toolbar-container';
import {
  TrackEditingModalContainer,
} from '../track-editing-modal/track-editing-modal-container';
import './tracker.scss';


const component = () =>
  h('.tracker', [
    h(TrackerToolbarContainer),
    h(TracksContainer),
    h(SongTimelineContainer),
    h(TrackEditingModalContainer),
  ]);

const composed = compose(
  setDisplayName('Tracker'),
  pure,
)(component);

export const Tracker = composed;
