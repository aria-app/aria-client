import h from 'react-hyperscript';
import { TracksContainer } from '../tracks/tracks-container';
import { SongTimelineContainer } from '../song-timeline-container/song-timeline-container';
import { TrackerToolbarContainer } from '../tracker-toolbar/tracker-toolbar-container';
import {
  TrackEditingModalContainer,
} from '../track-editing-modal/track-editing-modal-container';
import './tracker.scss';

export const Tracker = () => h('.tracker', [
  h(TrackerToolbarContainer),
  h(TracksContainer),
  h(SongTimelineContainer),
  h(TrackEditingModalContainer),
]);
