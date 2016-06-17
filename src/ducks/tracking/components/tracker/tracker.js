import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import React from 'react';
import h from 'react-hyperscript';
import { TracksContainer } from '../tracks-container/tracks-container';
import { SongTimelineContainer } from '../song-timeline-container/song-timeline-container';
import { TrackerToolbarContainer } from '../tracker-toolbar-container/tracker-toolbar-container';
import {
  TrackEditingModalContainer,
} from '../track-editing-modal-container/track-editing-modal-container';
import './tracker.scss';


const component = (props) =>
  h('.tracker', {
    style: props.style,
  }, [
    h(TrackerToolbarContainer),
    h(TracksContainer, {
      openSequence: props.openSequence,
    }),
    h(SongTimelineContainer),
    h(TrackEditingModalContainer),
  ]);

const composed = compose([
  setDisplayName('Tracker'),
  pure,
  setPropTypes({
    addNewTrack: React.PropTypes.func.isRequired,
    openSequence: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string,
  }),
  withHandlers({
    openSequence: (props) => () => {
      props.openSequence(props.selectedSequenceId);
    },
  }),
])(component);

export const Tracker = composed;
